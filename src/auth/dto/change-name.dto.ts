import { IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ChangeNameDto {
  @ApiProperty({ example: "Fardin" })
  @IsString()
  @MinLength(1)
  firstName: string;

  @ApiProperty({ example: "Rahman" })
  @IsString()
  @MinLength(1)
  lastName: string;
}
