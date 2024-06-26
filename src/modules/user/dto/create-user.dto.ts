import { ApiProperty } from "@nestjs/swagger"

export class CreateUserDto {
    @ApiProperty()
    fullName: string

    @ApiProperty()
    age: number

    @ApiProperty()
    email: string

    @ApiProperty()
    password: string
}
