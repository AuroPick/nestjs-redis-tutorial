import { Module, CacheModule as NestCacheModule } from '@nestjs/common'
import * as redisStore from 'cache-manager-redis-store'
import { ClientOpts } from 'redis'

import { CacheService } from './cache.service'

@Module({
  imports: [
    NestCacheModule.register<ClientOpts>({
      store: redisStore,
      host: 'localhost',
      port: 6379,
      ttl: 30
    })
  ],
  controllers: [],
  providers: [CacheService],
  exports: [CacheService]
})
export class CacheModule {}
