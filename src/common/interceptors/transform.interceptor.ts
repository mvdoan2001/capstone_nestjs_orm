import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { RESPONSE_MESSAGE } from '../decorators/response.message-decorator';


export interface Response<> {
    statusCode: number,
    message?: string,
    data: any
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response> {
    constructor(private readonly reflector: Reflector) { }

    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<Response> | Promise<Observable<Response>> {
        return next.handle().pipe(
            map((data) => {
                return {
                    statusCode: context.switchToHttp().getResponse().statusCode,
                    message: this.reflector.get<string>(RESPONSE_MESSAGE, context.getHandler()) || '',
                    data: data
                }
            })
        )
    }

}