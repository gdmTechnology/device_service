import { DeleteDevice } from '@/domain/usecases'
import { DbDeleteDevice } from '@/data/usecases'
import { DeviceMongoRepository } from '@/infra/db/mongodb'

export const makeDbDeleteDevice = (): DeleteDevice => {
    const deviceMongoRepository = new DeviceMongoRepository()
    return new DbDeleteDevice(deviceMongoRepository)
}
