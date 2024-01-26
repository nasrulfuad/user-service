import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    request.requestId = Math.random().toString();
    const now = Date.now();

    console.log({
      requestId: request.requestId,
      method: request.method,
      url: request.url,
      requestedAt: new Date(now),
    });

    return next.handle().pipe(
      tap(() =>
        console.log({
          requestId: request.requestId,
          method: request.method,
          url: request.url,
          responseTime: `${Date.now() - now}ms`,
        }),
      ),
    );
  }
}
