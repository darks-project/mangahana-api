import { Controller, Get, HttpException, HttpStatus, ParseIntPipe, Patch, Query, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './service';
import { AuthGuard } from 'common/guards/auth.guard';
import { UserData } from 'common/decorators/user.decorator';
import { User } from './interface';

@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @Get()
  async get(@Query('id', ParseIntPipe) userId: number) {
    try {
      return await this.service.getUserByID(userId);
    } catch (e) {
      throw new HttpException(e.toString(), HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/getMe')
  @UseGuards(AuthGuard)
  async getMe(@UserData() user: User) {
    try {
      return await this.service.getUserByID(user.id);
    } catch (e) {
      throw new HttpException(e.toString(), HttpStatus.BAD_REQUEST);
    }
  }

  @Patch('')
  async update() {
    try {
      // take the here
    } catch (e) {
      throw new HttpException(e.toString(), HttpStatus.BAD_REQUEST);
    }
  }
}

