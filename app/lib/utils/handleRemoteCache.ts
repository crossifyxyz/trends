import { CacheModel } from '@/lib/models'
import { CacheType } from '@/lib/types'
import { unixTime } from '.'

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
): Promise<{ message: string; data?: T }> {
  // Determine the cache model based on the provided name
  const DynamicCacheModel = CacheModel[modelName]

  try {
    const latestCache = (
      await DynamicCacheModel.find(filter)
        .sort({ updatedAt: -1 }) // sort in descending order
        .limit(1) // get only one document
        .lean()
    )?.[0]

    const isUpToDate =
      !!latestCache &&
      latestCache.updatedAt + thresholdHours * 3_600 > unixTime()

    if (isUpToDate)
      return {
        message: `${modelName} is up to date`,
        data: latestCache.data as T,
      }

    // If no data exists or the data is outdated
    const latestData = await fetchLatestData()

    if (!latestData) throw new Error('Error fetching latest data')

    const defaultCase = () =>
      DynamicCacheModel.create({
        data: latestData,
      })

    if (insert) {
      await defaultCase()

      return { message: `${modelName} inserted`, data: latestData }
    } // Try to update existing document
    else {
      const update = await DynamicCacheModel.findOneAndUpdate(filter, {
        data: latestData,
        updatedAt: unixTime(),
      }).lean()

      // If no document was updated, create a new one
      if (!update) await defaultCase()
    }

    return { message: `${modelName} updated`, data: latestData }
  } catch (err: any) {
    return { message: err?.message as string, data: undefined }
  }
}
