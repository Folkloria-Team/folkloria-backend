import { provinceUseCase } from 'core/usecases/provinces'
import { createFactory } from 'hono/factory'

const factory = createFactory()

const provinceGetAllController = factory.createHandlers(async (c) => {
  const provinces = await provinceUseCase.getAllProvinces()
  return c.json({
    message: 'Provinces retrieved successfully',
    data: provinces,
  })
})

export const provinceController = {
  provinceGetAllController,
}
