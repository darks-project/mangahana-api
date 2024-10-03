import { Inject, Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';
import { PG_CONNECTION } from 'common/constraints/constraints';

import { SMS } from 'common/sms/sms.service';
import { UpdateUserDTO } from './dto';

@Injectable()
export class UsersService {
  constructor(@Inject(PG_CONNECTION) private db: PoolClient, private sms: SMS) {}

  async getUserBySession(token: string) {
    let sql = 'SELECT id, is_banned, (SELECT array_agg(permissions.name) FROM users.roles LEFT JOIN users.permissions ON permissions.id = any(roles.permissions) WHERE roles.id = users.role_id) as permissions FROM users.users WHERE id = (SELECT user_id FROM users.sessions WHERE token = $1)';
    let query = await this.db.query(sql, [token]);
    if (query.rows.length === 0) throw new Error('user not found');
    return query.rows[0];
  }

  async getUserByID(id: number) {
    let sql = 'SELECT id, username, description, photo, (SELECT name FROM users.roles WHERE id = users.role_id) as role FROM users.users WHERE id = $1;';
    let query = await this.db.query(sql, [id]);
    if (query.rows.length === 0) throw new Error('user not found');
    return query.rows[0];
  }

  async update(dto: UpdateUserDTO) {}
}