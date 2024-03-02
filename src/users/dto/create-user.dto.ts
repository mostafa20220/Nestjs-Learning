import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsEnum(['ADMIN', 'ENGINEER', 'MANAGER'], {
    message:
      'Invalid role. Must be one of the following ADMIN, ENGINEER, MANAGER',
  })
  readonly role: string;
}
