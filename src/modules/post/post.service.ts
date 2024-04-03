import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CommentDto } from './dto/comment-image.dto';

@Injectable()
export class PostService {
  prisma = new PrismaClient()

  async getImage() {
    try {
      return await this.prisma.images.findMany()
    } catch (error) {
      throw error
    }
  }

  async getImageByName(name: string) {
    try {
      let data = await this.prisma.images.findMany({
        where: {
          image_name: { contains: `${name}` }
        }
      })
      if (data.length < 1) throw new BadRequestException(`Không tìm thấy kết quả về ${name}`)
      return data
    } catch (error) {
      throw error
    }
  }

  async infoOfImage(imageId: string) {
    try {
      let data = await this.prisma.images.findFirst({
        where: { image_id: Number(imageId) }
      })
      if (!data || data.isDelete) throw new BadRequestException('Không tìm thấy ảnh!')
      return data
    } catch (error) {
      throw error
    }
  }

  async delImage(imageId: string) {
    try {
      let data = await this.prisma.images.findFirst({
        where: { image_id: Number(imageId) }
      })
      if (!data || data.isDelete) throw new BadRequestException('Không tìm thấy ảnh!')
      return await this.prisma.images.update(
        {
          where: { image_id: data.image_id },
          data: { ...data, isDelete: true }
        }
      )
    } catch (error) {
      throw error
    }
  }

  async saves(userId: string, imageId: string) {
    try {
      let image = await this.prisma.images.findFirst({
        where: { image_id: Number(imageId) }
      })
      if (!image || image.isDelete) throw new BadRequestException('Không tìm thấy ảnh!')
      let save = await this.prisma.saves.findFirst({
        where: { user_id: Number(userId), image_id: Number(imageId) }
      })
      if (save) {
        if (save.isSave) {
          return await this.prisma.saves.update(
            {
              where: { save_id: save.save_id },
              data: { ...save, isSave: false }
            }
          )
        } else {
          return await this.prisma.saves.update(
            {
              where: { save_id: save.save_id },
              data: { ...save, isSave: true }
            }
          )
        }
      }
      return await this.prisma.saves.create({
        data: {
          image_id: Number(imageId),
          user_id: Number(userId),
          isSave: true,
          create_at: new Date()
        }
      })

    } catch (error) {
      throw error
    }
  }

  async getComment(imageId: string) {
    try {
      let image = await this.prisma.images.findFirst({
        where: { image_id: Number(imageId) }
      })
      if (!image || image.isDelete) throw new BadRequestException('Không tìm thấy ảnh!')
      return await this.prisma.comments.findMany({
        where: { image_id: image.image_id },
        include: { users: true }
      })
    } catch (error) {
      throw error
    }
  }

  async postComment(commentDto: CommentDto, userId: string) {
    try {
      let { imageId, content } = commentDto
      let image = await this.prisma.images.findFirst({
        where: { image_id: Number(imageId) }
      })
      if (!image || image.isDelete) throw new BadRequestException('Không tìm thấy ảnh!')
      return await this.prisma.comments.create({
        data: {
          content: content,
          user_id: Number(userId),
          image_id: Number(imageId),
          create_at: new Date()
        }
      })
    } catch (error) {
      throw error
    }
  }

  async putComment(commentDto: CommentDto, userId: string) {
    try {
      let { imageId, content } = commentDto
      let image = await this.prisma.images.findFirst({
        where: { image_id: Number(imageId) }
      })
      if (!image || image.isDelete) throw new BadRequestException('Không tìm thấy ảnh!')
      let comment = await this.prisma.comments.findFirst({
        where: { user_id: Number(userId), image_id: Number(image.image_id) }
      })
      return await this.prisma.comments.update({
        where: { comment_id: comment.comment_id },
        data: { ...comment, content }
      })
    } catch (error) {
      throw error
    }
  }

  async delComment(userId: string, commentId: string) {
    try {
      let comment = await this.prisma.comments.findFirst({
        where: { comment_id: Number(commentId), user_id: Number(userId) }
      })
      return await this.prisma.comments.update({
        where: { comment_id: comment.comment_id },
        data: { ...comment, isDelete: true }
      })
    } catch (error) {
      throw error
    }
  }

  async upload(file: any, userId: string, description: string) {
    try {
      let newImage = {
        image_name: String(file.originalname),
        url: String(file.filename),
        description,
        user_id: Number(userId),
        create_at: new Date()
      }
      return await this.prisma.images.create({ data: newImage })
    } catch (error) {
      throw error
    }
  }
}
