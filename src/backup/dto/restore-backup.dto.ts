import { Equals } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RestoreBackupDto {
  @ApiProperty({
    description: 'Type "RESTORE" to confirm that all current data is replaced',
    example: "RESTORE",
  })
  @Equals("RESTORE", { message: 'confirm must be exactly "RESTORE"' })
  confirm: string;
}
