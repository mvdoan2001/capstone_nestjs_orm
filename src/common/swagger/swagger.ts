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

// export const CreatedResponse = (mes: string, $ref: any) => (
//     ApiCreatedResponse({
//         schema: {
//             properties: {
//                 statusCode: { example: 201 },
//                 message: { example: mes },
//                 data: {
//                     $ref: getSchemaPath($ref)
//                 }
//             }
//         }
//     })
// )

// export const UpdatedResponse = (mes: string) => (
//     ApiCreatedResponse({
//         schema: {
//             properties: {
//                 statusCode: { example: 201 },
//                 message: { example: mes },
//                 data: {
//                     example: {
//                         acknowledged: true,
//                         modifiedCount: 1,
//                         upsertedId: null,
//                         upsertedCount: 0,
//                         matchedCount: 1
//                     }
//                 }
//             }
//         }
//     })
// )

// export const OkResponse = (mes: string, $ref?: any, pagiantion = false, data?: any) => {
//     if ($ref) {
//         if (pagiantion) {
//             return ApiOkResponse({
//                 schema: {
//                     properties: {
//                         statusCode: { example: 200 },
//                         message: { example: mes },
//                         data: {
//                             properties: {
//                                 meta: {
//                                     type: 'object',
//                                     properties: {
//                                         currentPage: { type: 'number', example: 1 },
//                                         pageSize: { type: 'number', example: 1 },
//                                         totalPages: { type: 'number', example: 4 },
//                                         totalItems: { type: 'number', example: 4 }
//                                     }
//                                 },
//                                 result: {
//                                     type: 'array',
//                                     items: {
//                                         $ref: getSchemaPath($ref)
//                                     }
//                                 }
//                             }
//                         }
//                     }
//                 }
//             })
//         }

//         return ApiOkResponse({
//             schema: {
//                 properties: {
//                     statusCode: { example: 200 },
//                     message: { example: mes },
//                     data: {
//                         $ref: getSchemaPath($ref)
//                     }
//                 }
//             }
//         })
//     }

//     if (data) {
//         if (pagiantion) {
//             return ApiOkResponse({
//                 schema: {
//                     properties: {
//                         statusCode: { example: 200 },
//                         message: { example: mes },
//                         data: {
//                             properties: {
//                                 meta: {
//                                     type: 'object',
//                                     properties: {
//                                         currentPage: { type: 'number', example: 1 },
//                                         pageSize: { type: 'number', example: 1 },
//                                         totalPages: { type: 'number', example: 4 },
//                                         totalItems: { type: 'number', example: 4 }
//                                     }
//                                 },
//                                 result: {
//                                     type: 'array',
//                                     example: data
//                                 }
//                             }
//                         }
//                     }
//                 }
//             })
//         }

//         return ApiOkResponse({
//             schema: {
//                 properties: {
//                     statusCode: { example: 200 },
//                     message: { example: mes },
//                     data: { example: data }
//                 }
//             }
//         })
//     }

//     return ApiOkResponse({
//         schema: {
//             properties: {
//                 statusCode: { example: 200 },
//                 message: { example: mes },
//                 data: { example: [] }
//             }
//         }
//     })
// }