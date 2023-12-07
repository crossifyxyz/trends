import { CacheModel } from '@/lib/models'
import { CacheType } from '@/lib/types'
import { unixTime } from '.'
import connectDB from './connectDB'

/**
 * Updates a specific cache model with new data if the existing data is outdated.
 *
 * @param {CacheType} modelName - The name of the cache model to update.
 * @param {() => T} fetchLatestData - A function that fetches the latest data.
 * @param {Record<string, string>} filter - An optional filter object to find a specific document in the collection.
 * @param {number} thresholdHours - The number of hours after which the data is considered outdated (default is 12).
 * @param {boolean} insert - Whether to insert a new document rather than update (default is false).
 * @returns {Promise<{ message: string; data: T | undefined }>} A promise that resolves to a string message indicating the result of the update.
 *
 * @template T Type of the latest data fetched.
 *
 * @example
 * handleRemoteCache('Chains', LifiService.getChains, {})
 * handleRemoteCache('FiatRate', () => ExternalCallService.fetchExchangeRate('USD'), { 'data.base': 'USD' })
 */
export default async function handleRemoteCache<T>(
  modelName: CacheType,
  fetchLatestData: () => T,
  filter: Record<string, string> = {},
  thresholdHours: number = 12,
  insert: boolean = false
): Promise<T> {
  await connectDB()
  // Determine the cache model based on the provided name
  const DynamicCacheModel = CacheModel[modelName]

  const latestCache = (
    await DynamicCacheModel.find(filter)
      .sort({ updatedAt: -1 }) // sort in descending order
      .limit(1) // get only one document
      .lean()
  )?.[0]

  const isUpToDate =
    !!latestCache && latestCache.updatedAt + thresholdHours * 3_600 > unixTime()

  // Return the latest cache if it exists and is up to date
  if (isUpToDate) return latestCache.data as T

  // Return the latest cache immediately
  const result = Promise.resolve(latestCache.data as T)

  // Perform the update or create actions in the background
  result.then(async () => {
    // If no data exists or the data is outdated
    const latestData = await fetchLatestData()

    if (!latestData) throw new Error('Error fetching latest data')

    const handleInsert = () => {
      console.log(`INSERT NEW ${modelName} CACHE`)
      return DynamicCacheModel.create({
        data: latestData,
      })
    }

    if (insert) await handleInsert()
    // Try to update existing document
    else {
      console.log(`UPDATING ${modelName} CACHE`)
      const update = await DynamicCacheModel.findOneAndUpdate(filter, {
        data: latestData,
        updatedAt: unixTime(),
      }).lean()

      // If no document was updated, create a new one
      if (!update) await handleInsert()
    }
  })

  return result
}
