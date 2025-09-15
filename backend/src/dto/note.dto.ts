import { IsString, IsNotEmpty, MaxLength } from "class-validator";


export class CreateNoteDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  title!: string;

  @IsString()
  @IsNotEmpty()
  text!: string;
}
