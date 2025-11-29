import { IsBoolean, IsInt, IsNumber } from 'class-validator';

export class CreateOfferDto {
  /*Создаем уникальный номер желания*/
  @IsNumber()
  itemId: number;
  /*Создаем сумму денег на желание*/
  @IsInt()
  amount: number;

  @IsBoolean()
  hidden: boolean;
}
