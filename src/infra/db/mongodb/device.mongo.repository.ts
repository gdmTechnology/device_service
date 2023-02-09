import { CreateDeviceRepository, UpdateDeviceRepository } from '@/data/protocols'
import { DeviceModel } from './models'

export class DeviceMongoRepository implements CreateDeviceRepository, UpdateDeviceRepository {
    async save(data: CreateDeviceRepository.Params): Promise<CreateDeviceRepository.Result | null> {
        const result = await DeviceModel.create(data)
        if (result.accountId) return result
        return null
    }

    async update(data: UpdateDeviceRepository.Params): Promise<UpdateDeviceRepository.Result> {
        const filter = { deviceIdentification: data.deviceIdentification }
        const update = {
            deviceName: data.deviceName,
            deviceType: data.deviceType
        }
        const option = { new: true }
        const device = await DeviceModel.findOneAndUpdate(filter, update, option).lean()
        return device
    }
}
