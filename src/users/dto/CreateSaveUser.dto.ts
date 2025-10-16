import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';

/* По свагеру, при регистрации нужно вернуть обьект созданного юзера без поля password */
export class CreateSaveUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @Length(2, 30)
  username: string;

  @IsUrl()
  @IsOptional()
  avatar?: string;

  @IsString()
  @IsOptional()
  @Length(1, 100)
  about?: string;
}
