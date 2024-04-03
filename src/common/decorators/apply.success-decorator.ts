import { applyDecorators, UseGuards } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import { ApiBearerAuth } from "@nestjs/swagger"
import { ResponseMessage } from "src/common/decorators/response.message-decorator"

export const ApiSuccess = () => {
    const mes = 'Xử lý thành công!'
    return applyDecorators(
        UseGuards(AuthGuard("jwt")),
        ApiBearerAuth(),
        ResponseMessage(mes)
    )
}