import { IsEmail, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ChangeEmailDto {
  @ApiProperty({ example: "newemail@example.com" })
  @IsEmail()
  newEmail: string;

  @ApiProperty({ example: "currentPassword123" })
  @IsString()
  @MinLength(1)
  currentPassword: string;
}
