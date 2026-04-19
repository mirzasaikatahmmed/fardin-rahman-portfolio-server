import { IsString, MinLength, Matches } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ChangePasswordDto {
  @ApiProperty({ example: "currentPassword123" })
  @IsString()
  @MinLength(1)
  currentPassword: string;

  @ApiProperty({ example: "NewPassword123" })
  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message: "newPassword must contain at least one uppercase letter, one lowercase letter, and one number",
  })
  newPassword: string;
}
