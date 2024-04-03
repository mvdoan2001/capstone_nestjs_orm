import { INestApplication } from "@nestjs/common";
import { ApiCreatedResponse, ApiOkResponse, DocumentBuilder, getSchemaPath, refs, SwaggerModule } from "@nestjs/swagger";


export const useSwagger = (app: INestApplication) => {
    const config = new DocumentBuilder()
        .setTitle('Capstone_ORM_API')
        .setVersion('1.0')
        .addBearerAuth()
        .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('/swagger', app, document)
}

