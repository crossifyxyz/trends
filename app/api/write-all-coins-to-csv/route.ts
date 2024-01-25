import { CacheModel } from '@/lib/models'
// @ts-ignore
import { Parser } from 'json2csv'
import fs from 'fs'
import path from 'path'
import connectDB from '@/lib/utils/connectDB'

const tempDir =
  '/home/anon/Desktop/crossify/trends/app/api/write-all-coins-to-csv/temp'

export async function GET() {
  async function writeDataToCSV() {
    await connectDB()
    const data = await CacheModel.LUNAR_CRUSH_COINS.findOne({}).lean()

    const parser = new Parser()

    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir)
    }

    // data.forEach((item, index) => {
    //   const csv = parser.parse(item)
    //   fs.writeFileSync(path.join(tempDir, `file${index}.csv`), csv)
    // })

    const csv = parser.parse(data)
    fs.writeFileSync(path.join(tempDir, `file${1}.csv`), csv)
  }

  writeDataToCSV()
}
