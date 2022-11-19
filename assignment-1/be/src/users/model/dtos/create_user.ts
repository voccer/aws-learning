import { IsEmail, IsNotEmpty } from 'class-validator'

export class createUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string
}
