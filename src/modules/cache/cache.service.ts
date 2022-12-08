import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common'
import { Cache, CachingConfig } from 'cache-manager'
import { RedisClient } from 'redis'

@Injectable()
export class CacheService {
  protected readonly client: RedisClient

  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache
  ) {
    this.client = (this.cacheManager.store as any).getClient()
  }

  set<T>(key: string, value: T, options?: CachingConfig): Promise<T> {
    return this.cacheManager.set(key, value, options)
  }

  get<T>(key: string): Promise<T> {
    return this.cacheManager.get(key)
  }

  delete(key: string): void {
    this.scan(key, (keys) => this.client.unlink(keys))
  }

  reset(): Promise<void> {
    return this.cacheManager.reset()
  }

  protected scan(key: string, cb: (keys: string[]) => void): void {
    let cursor = '0'

    const scanLoop = () => {
      /**
       * client type imported from redis@4 but cache-manager uses redis@3 so we must use ts-ignore
       */
      // @ts-ignore
      this.client.scan(cursor, 'MATCH', key, 'COUNT', '10', (err, res) => {
        if (err) throw err

        // update the cursor position for the next scan
        cursor = res[0]
        // get the SCAN result for this iteration
        const keys = res[1]

        if (keys?.length > 0) {
          cb(keys)
        }

        if (cursor === '0') return

        scanLoop()
      })
    }

    scanLoop()
  }
}
