import { UpdateDevice } from '@/domain/usecases'
import { DbUpdateDevice } from '@/data/usecases'
import { DeviceMongoRepository } from '@/infra/db/mongodb'

export const makeDbUpdateDevice = (): UpdateDevice => {
    const deviceMongoRepository = new DeviceMongoRepository()
    return new DbUpdateDevice(deviceMongoRepository)
}
