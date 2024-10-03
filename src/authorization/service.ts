import { Inject, Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';
import { PG_CONNECTION } from 'common/constraints/constraints';

import { SMS } from 'common/sms/sms.service';
import { ConfirmPhoneDTO, CreateUserDTO, LoginDTO } from './dto';

@Injectable()
export class AuthorizationService {
  constructor(@Inject(PG_CONNECTION) private db: PoolClient, private sms: SMS) {}

  async join(phone: string) {
    if (await this.isPhoneExists(phone)) {
      throw new Error('this phone is already in use');
    }

    {
      // сделать дополнительный лимит времени для айпи
      let sql = `SELECT * FROM users.confirmation_codes WHERE phone = $1 AND created_at + INTERVAL '3 minutes' > NOW()`;
      let query = await this.db.query(sql, [phone]);
      if (query.rows.length > 0) {
        throw new Error('code for this phone number already been sent');
      }
    }

    const code = this.generateRandomNumberCode(6).toString();
    let sql = 'INSERT INTO users.confirmation_codes (code, phone) VALUES ($1, $2);';
    await this.db.query(sql, [code, phone]);
    
    const isSended = await this.sms.Send(phone, `beyne\nСіздің растау кодыңыз: ${code}`);
    if (!isSended) {
      throw new Error('SMS cant be sent');
    }
  }

  async confirmPhone(dto: ConfirmPhoneDTO) {
    let sql = 'SELECT * FROM users.confirmation_codes WHERE code = $1 AND phone = $2;';
    let query = await this.db.query(sql, [dto.code, dto.phone]);
    if (query.rows.length === 0) {
      throw new Error('unknow code for number');
    }
  }

  async create(dto: CreateUserDTO) {
    await this.confirmPhone({ phone: dto.phone, code: dto.code });
  
    const regex = /^[a-zA-Z0-9]+(_?[a-zA-Z0-9]+)*$/;
    if (!regex.test(dto.username)) {
      throw new Error('username is not valid');
    }
    
    let sql = 'INSERT INTO users.users (phone, password, username) VALUES ($1, $2, $3) RETURNING id;'
    let query = await this.db.query(sql, [dto.phone, dto.password, dto.username]);

    const userId: number = query.rows[0].id;

    await this.db.query('DELETE FROM users.confirmation_codes WHERE phone = $1', [dto.phone]);
    
    const token = await this.createNewSession(userId);
    return { token };
  }

  async login(dto: LoginDTO) {
    let sql = 'SELECT id FROM users.users WHERE phone = $1 AND password = $2;';
    let query = await this.db.query(sql, [dto.phone, dto.password]);
    if (query.rows.length === 0) {
      throw new Error('Invalid data');
    }

    const userId = query.rows[0].id;

    const token = await this.createNewSession(userId);
    return { token };
  }


  async createNewSession(userId: number): Promise<string> {
    const token = this.generateRandomString(64);
    
    let sql = 'INSERT INTO users.sessions (user_id, token) VALUES ($1, $2);';
    await this.db.query(sql, [userId, token]);

    return token;
  }

  async getUserBySession(token: string) {
    let sql = 'SELECT id, is_banned, (SELECT array_agg(permissions.name) FROM users.roles LEFT JOIN users.permissions ON permissions.id = any(roles.permissions) WHERE roles.id = users.role_id) as permissions FROM users.users WHERE id = (SELECT user_id FROM users.sessions WHERE token = $1)';
    let query = await this.db.query(sql, [token]);
    if (query.rows.length === 0) throw new Error('user not found');
    return query.rows[0];
  }

  async isPhoneExists(phone: string): Promise<boolean> {
    let sql = 'SELECT * FROM users.users WHERE phone = $1';
    let query = await this.db.query(sql, [phone]);
    return query.rows.length === 1;
  }

  async getUserByID(id: number) {
    let sql = 'SELECT id, username, description, photo, (SELECT name FROM users.roles WHERE id = users.role_id) as role FROM users.users WHERE id = $1;';
    let query = await this.db.query(sql, [id]);
    if (query.rows.length === 0) throw new Error('user not found');
    return query.rows[0];
  }

  // 


  //
  generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
  
    return result;
  }  
  generateRandomNumberCode(length: number): number {
    const min = Math.pow(10, length - 1);
    const max = Math.pow(10, length) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}