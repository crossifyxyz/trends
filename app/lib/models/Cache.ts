import { model, models, Schema } from 'mongoose'
import { unixTime } from '../utils'
import {
  CacheBase,
  CacheType,
  LunarCrushCoinsCache,
  MongoGenericModel,
} from '../types'
import { LunarCrushCoinCacheSchema } from './LunarCrushCoinsSchema'

// Define the base schema
const CacheBaseSchema = new Schema<CacheBase>(
  {
    type: {
      type: String,
      enum: CacheType,
      required: true,
    },
    updatedAt: {
      type: Number,
      required: true,
      default: () => unixTime(),
    },
    idle: {
      type: Boolean,
      default: true,
    },
  },
  { discriminatorKey: 'type' }
)

export default class CacheModel {
  private static Base =
    (models.cache as MongoGenericModel<typeof CacheBaseSchema>) ||
    model('cache', CacheBaseSchema)

  public static [CacheType.LunarCrushCoins] =
    (models.cache.discriminators?.[
      CacheType.LunarCrushCoins
    ] as MongoGenericModel<typeof LunarCrushCoinCacheSchema>) ||
    this.Base.discriminator<CacheBase & LunarCrushCoinsCache>(
      CacheType.LunarCrushCoins,
      LunarCrushCoinCacheSchema
    )
}
