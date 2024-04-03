import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateInfoDto, UpdatePassDto } from './dto/update-user.dto';
import {  ApiTags } from '@nestjs/swagger';
import { ResponseMessage } from 'src/common/decorators/response.message-decorator';
import { loginUserDto } from './dto/login.dto';
import { Request } from 'express';
import { ApiSuccess } from '../../common/decorators/apply.success-decorator';

@ApiTags('USER')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @ResponseMessage('Đăng kí thành công!')
  @Post('/register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }

  @ResponseMessage('Đăng nhập thành công!')
  @Post('/login')
  login(@Body() loginUserDto: loginUserDto) {
    return this.userService.login(loginUserDto);
  }

  @ApiSuccess()
  @Get('')
  getUser(@Req() req: Request) {
    let { userId }: any = req.user
    return this.userService.getUser(userId);
  }

  @ApiSuccess()
  @Put('/changePassword')
  editPass(@Body() updateUserDto: UpdatePassDto, @Req() req: Request) {
    let { userId }: any = req.user

    return this.userService.editPass(updateUserDto, userId);
  }
  
  @ApiSuccess()
  @Put('/changeInfo')
  editInfo(@Body() updateInfoDto: UpdateInfoDto, @Req() req: Request) {
    let { userId }: any = req.user

    return this.userService.editInfo(updateInfoDto, userId);
  }

  @ApiSuccess()
  @Get('/list-save')
  getListSave(@Req() req: Request) {
    let { userId }: any = req.user
    return this.userService.getListSave(userId)
  }

  @ApiSuccess()
  @Get('/list-create')
  getListCreate(@Req() req: Request) {
    let { userId }: any = req.user
    return this.userService.getListCreate(userId)
  }
}
