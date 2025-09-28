import { provinceRepository } from 'core/repositories/provinces'

async function getAllProvinces() {
  return await provinceRepository.getAllProvinces()
}

export const provinceUseCase = {
  getAllProvinces,
}
