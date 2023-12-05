import { IsNotEmpty } from 'class-validator';

export class LoginGoogleDto {
  @IsNotEmpty()
  token: string;
}
