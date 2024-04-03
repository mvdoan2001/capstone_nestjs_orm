import { ApiProperty, PartialType } from '@nestjs/swagger';

export class UpdatePassDto {
    @ApiProperty()
    email: string;

    @ApiProperty()
    newPassword: string;
}

export class UpdateInfoDto {
    @ApiProperty()
    newName: string    
}