import { Body, Controller, Get,  HttpCode,  HttpException, HttpStatus, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ConfirmPhoneDTO, CreateUserDTO, JoinDTO, LoginDTO } from './dto/users.dto';

@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

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
      return await this.service.isPhoneExists(phone);
    } catch (e) {
      throw new HttpException(e.toString(), HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  //@UseGuards(AuthGuard)
  async getMe(@Query('id', ParseIntPipe) userId: number) {
    try {
      return await this.service.getUserByID(userId);
    } catch (e) {
      throw new HttpException(e.toString(), HttpStatus.BAD_REQUEST);
    }
  }
}