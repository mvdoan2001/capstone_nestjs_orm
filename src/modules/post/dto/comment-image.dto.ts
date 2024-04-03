import { ApiProperty } from "@nestjs/swagger";

export class CommentDto {
    @ApiProperty()
    imageId: string

    @ApiProperty()
    content: string
}