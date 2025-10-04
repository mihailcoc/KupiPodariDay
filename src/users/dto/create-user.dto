import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsString()
  @Length(2, 30)
  username: string;

  @IsUrl()
  @IsOptional()
  avatar?: string;

  @IsString()
  @IsOptional()
  @Length(2, 200)
  about?: string;
}
