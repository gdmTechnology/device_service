import { CreateDeviceRepository } from '@/data/protocols'
import { DeviceModel } from './models'

export class DeviceMongoRepository implements CreateDeviceRepository {
    async save(data: CreateDeviceRepository.Params): Promise<CreateDeviceRepository.Result | null> {
        const result = await DeviceModel.create(data)
        if (result.accountId) return result
        return null
    }
}
