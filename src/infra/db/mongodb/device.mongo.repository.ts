import { CreateDeviceRepository, UpdateDeviceRepository, GetDeviceRepository, ListDeviceRepository } from '@/data/protocols'
import { DeviceModel } from './models'

export class DeviceMongoRepository implements CreateDeviceRepository,
    UpdateDeviceRepository,
    GetDeviceRepository,
    ListDeviceRepository {
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

    async get(deviceIdentification: string): Promise<GetDeviceRepository.Result> {
        const device = await DeviceModel.findOne({ deviceIdentification }).lean()
        return device
    }

    async list(deviceTenantId: string): Promise<ListDeviceRepository.Result[]> {
        const device = await DeviceModel.find({ deviceTenantId }).lean()
        return device
    }
}
