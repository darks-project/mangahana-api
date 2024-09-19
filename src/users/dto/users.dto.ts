import { IsNotEmpty, Length } from 'class-validator';

export class JoinDTO {
  @Length(10, 10)
  phone: string;
}

export class ConfirmPhoneDTO {
  @Length(10, 10)
  phone: string;

  @Length(6, 6)
  code: string;
}

export class LoginDTO {
  @Length(10, 10)
  phone: string;

  @Length(8)
  password: string;
}

export class CreateUserDTO {
  @Length(10, 10)
  phone: string;

  @Length(6, 6)
  code: string;
  
  @Length(3)
  username: string;

  @Length(8)
  password: string;
}