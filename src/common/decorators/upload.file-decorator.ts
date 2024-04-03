import { applyDecorators, UseGuards, UseInterceptors } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import { FileInterceptor } from "@nestjs/platform-express"
import { ApiBearerAuth, ApiBody, ApiConsumes } from "@nestjs/swagger"
import { diskStorage } from "multer"
import { ResponseMessage } from "src/common/decorators/response.message-decorator"
import { FileUploadDto } from "src/modules/post/dto/file-upload.dto"

export const Upload = () => {
    const mes = 'Thêm ảnh thành công!'
    return applyDecorators(
        UseGuards(AuthGuard("jwt")),
        ApiBearerAuth(),
        ResponseMessage(mes),
        UseInterceptors(FileInterceptor('file', {
            storage: diskStorage({
                destination: process.cwd() + "./public/img",
                filename(req, file, callback) {
                    callback(null, new Date().getTime() + "_" + file.originalname)
                },
            })
        })),
        ApiConsumes('multipart/form-data'),
        ApiBody({
            description: 'Image',
            type: FileUploadDto,
        })
    )
}