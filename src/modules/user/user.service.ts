import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateInfoDto, UpdatePassDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { loginUserDto } from './dto/login.dto';


@Injectable()
export class UserService {

  constructor(
    private jwtService: JwtService,
    private config: ConfigService
  ) { }

  prisma = new PrismaClient()

  async register(createUserDto: CreateUserDto) {
    try {
      const { fullName, age, email, password } = createUserDto
      const checkEmail = await this.prisma.users.findFirst({
        where: { email }
      });
      if (checkEmail) throw new BadRequestException(`${email} đã tồn tại!`)
      const newUser = {
        user_name: fullName,
        age: age,
        email: email,
        password: bcrypt.hashSync(password, 10),
        create_at: new Date()
      }
      await this.prisma.users.create({ data: newUser })
    } catch (error) {
      throw error
    }
  }

  async login(loginUserDto: loginUserDto) {
    try {
      let { email, password } = loginUserDto
      let checkEmail = await this.prisma.users.findFirst({ where: { email } })
      let key = new Date().getTime()
      if (checkEmail) {
        if (bcrypt.compareSync(password, checkEmail.password)) {
          let token = this.jwtService.signAsync({ userId: checkEmail.user_id, key }, { secret: this.config.get("SECRET_KEY"), expiresIn: '5d' })
          return token
        } else {
          throw new BadRequestException('Mật khẩu không đúng!')
        }
      }
      throw new BadRequestException('Email không tồn tại !')
    } catch (error) {
      throw error
    }
  }

  async getUser(userId: number) {
    try {
      let user = this.prisma.users.findFirst({
        where: { user_id: userId }
      });
      if (!user) throw new BadRequestException('Người dùng không tồn tại !')
      return user
    } catch (error) {
      throw error
    }
  }

  async editPass(updateUserDto: UpdatePassDto, userId: number) {
    try {
      let { newPassword, email } = updateUserDto
      let user = await this.prisma.users.findFirst({
        where: { 
          user_id: userId,
          email 
        }
      });
      if (!user) throw new BadRequestException('Người dùng không tồn tại !')
      return await this.prisma.users.update(
        {
          where: { user_id: user.user_id },
          data: { ...user, password: bcrypt.hashSync(newPassword, 10) }
        }
      )
    } catch (error) {
      throw error
    }
  }

  async editInfo(updateInfoDto: UpdateInfoDto, userId: number) {
    try {
      let { newName } = updateInfoDto
      let user = await this.prisma.users.findFirst({
        where: { user_id: userId }
      });
      if (!user) throw new BadRequestException('Người dùng không tồn tại !')
      return await this.prisma.users.update(
        {
          where: { user_id: user.user_id },
          data: { ...user, user_name: newName }
        }
      )
    } catch (error) {
      throw error
    }
  } 

  async getListSave(userId: number) {
    try {
      return await this.prisma.saves.findMany({
        where: {
          isSave: true,
          user_id: userId
        },
        include: { images: true, users: true }
      })
    } catch (error) {
      throw error
    }
  }

  async getListCreate(userId: number) {
    try {
      return await this.prisma.images.findMany({
        where: {
          user_id: userId
        },
        include: { users: true }
      })
    } catch (error) {
      throw error
    }
  }
}
