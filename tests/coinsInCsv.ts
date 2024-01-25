import { CacheModel } from '@/lib/models'
// @ts-ignore
import { Parser } from 'json2csv'
import fs from 'fs'
import path from 'path'
import connectDB from '@/lib/utils/connectDB'

async function writeDataToCSV() {
  await connectDB()
  const data = await CacheModel.LUNAR_CRUSH_COINS.find({}).lean()

  console.log('data', data)

  const parser = new Parser()
  const csv = parser.parse(data)

  const tempDir = path.join(__dirname, 'temp')
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir)
  }

  data.forEach((item, index) => {
    fs.writeFileSync(path.join(tempDir, `file${index}.csv`), csv)
  })
}

writeDataToCSV()
