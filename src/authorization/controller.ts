import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ConfirmPhoneDTO, CreateUserDTO, JoinDTO, LoginDTO } from './dto';
import { AuthorizationService } from './service';

@Controller('/authorization')
export class AuthorizationController {
  constructor(private service: AuthorizationService) {}

  @Post('/join')
  async join(@Body() dto: JoinDTO) {
    try {
      return await this.service.join(dto.phone);
    } catch (e) {
      throw new HttpException(e.toString(), HttpStatus.BAD_REQUEST);
    }    
  }

  @HttpCode(200)
  @Post('/confirmPhone')
  async confirmPhone(@Body() dto: ConfirmPhoneDTO) {
    try {
      return await this.service.confirmPhone(dto);
    } catch (e) {
      throw new HttpException(e.toString(), HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/create')
  async create(@Body() dto: CreateUserDTO) {
    try {
      return await this.service.create(dto);
    } catch (e) {
      throw new HttpException(e.toString(), HttpStatus.BAD_REQUEST);
    }
  }

  @HttpCode(200)
  @Post('/login')
  async login(@Body() dto: LoginDTO) {
    try {
      return await this.service.login(dto);
    } catch (e) {
      throw new HttpException(e.toString(), HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/isPhoneExists')
  async isPhoneExists(@Query('phone', ParseIntPipe) phone: string) {
    try {
      const isExists = await this.service.isPhoneExists(phone);
      if (isExists) {
        return true;
      } else {
        throw new Error('false');
      }
    } catch (e) {
      throw new HttpException(e.toString(), HttpStatus.BAD_REQUEST);
    }
  }
}
