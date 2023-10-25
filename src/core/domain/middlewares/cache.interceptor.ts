import { ExecutionContext, SetMetadata } from '@nestjs/common';
import { CacheInterceptor as BaseCacheInterceptor } from '@nestjs/cache-manager';
import { Request } from 'express';

const NO_CACHE_DECORATOR_KEY = 'no_cache';
export const NoCache = () => SetMetadata(NO_CACHE_DECORATOR_KEY, true);

export class CacheInterceptor extends BaseCacheInterceptor {
  protected override isRequestCacheable(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();

    const noCache: boolean = this.reflector.get(NO_CACHE_DECORATOR_KEY, context.getHandler());

    return request.method === 'GET' && !noCache;
  }
}
