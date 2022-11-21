import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

export class UserRegisterDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string

  @IsString()
  @MinLength(1)
  readonly password: string

  @IsString()
  @MinLength(1)
  readonly password_confirmation: string
}
