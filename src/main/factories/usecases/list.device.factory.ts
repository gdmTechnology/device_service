import { ListDevice } from '@/domain/usecases'
import { DbListDevice } from '@/data/usecases'
import { DeviceMongoRepository } from '@/infra/db/mongodb'

export const makeDbListDevice = (): ListDevice => {
    const deviceMongoRepository = new DeviceMongoRepository()
    return new DbListDevice(deviceMongoRepository)
}
