import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';

export class ResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const customMessage = Reflect.getMetadata(
      'customMessage',
      context.getHandler(),
    );
    return next.handle().pipe(
      map((data) => {
        const res = {
          statusCode: context.switchToHttp().getResponse().statusCode,
          data: data,
          message: customMessage,
        };

        return res;
      }),
    );
  }
}
