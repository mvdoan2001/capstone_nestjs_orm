import { Controller, Get, Post, Param, Delete, Query, Put, Req, Body, UploadedFile } from '@nestjs/common';
import { PostService } from './post.service';
import { ApiTags } from '@nestjs/swagger';
import { ResponseMessage } from 'src/common/decorators/response.message-decorator';
import { ApiSuccess } from 'src/common/decorators/apply.success-decorator';
import { Request } from 'express';
import { CommentDto } from './dto/comment-image.dto';
import { Upload } from 'src/common/decorators/upload.file-decorator';

@ApiTags('POST')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @ResponseMessage('Lấy tất cả hình ảnh thành công')
  @Get('/images')
  getImages() {
    return this.postService.getImage();
  }

  @ResponseMessage('Xử lý thành công')
  @Get('/search')
  getImageByName(@Query('name') name: string) {
    return this.postService.getImageByName(name);
  }

  @ResponseMessage('Xử lý thành công!')
  @Get('/image/:imageId')
  infoOfImage(@Param("imageId") imageId: string) {
    return this.postService.infoOfImage(imageId)
  }

  @ResponseMessage('Xoá ảnh thành công')
  @Delete('/image/:imageId')
  delImage(@Param("imageId") imageId: string) {
    return this.postService.delImage(imageId)
  }

  @ApiSuccess()
  @Post('/image/:imageId/save')
  saves(@Param('imageId') imageId: string, @Req() req: Request) {
    let { userId }: any = req.user
    return this.postService.saves(userId, imageId)
  }

  @ResponseMessage('Xử lý thành công')
  @Get('/comments/:imageId')
  getComment(@Param('imageId') imageId: string) {
    return this.postService.getComment(imageId)
  }

  @ApiSuccess()
  @Post('/comments')
  postComment(@Body() commentDto: CommentDto, @Req() req: Request) {
    let { userId }: any = req.user
    return this.postService.postComment(commentDto, userId)
  }

  @ApiSuccess()
  @Put('/comments')
  putComment(@Body() commentDto: CommentDto, @Req() req: Request) {
    let { userId }: any = req.user
    return this.postService.putComment(commentDto, userId)
  }

  @ApiSuccess()
  @Delete('/comments/:commentId')
  delComment(@Req() req: Request, @Param('commentId') commentId: string) {
    let { userId }: any = req.user
    return this.postService.delComment(userId, commentId)
  }

  // upload
  @Upload()
  @Post('/upload')
  uploadFile(@UploadedFile() file: any, @Req() req: Request) {
    let { userId }: any = req.user
    let { description } = req.body
    return this.postService.upload(file, userId, description)
  }
}
