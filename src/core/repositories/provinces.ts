import { db } from 'infra/db'

async function getAllProvinces() {
  return await db.query.province.findMany()
}

export const provinceRepository = {
  getAllProvinces,
}
