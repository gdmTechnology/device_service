import { CreateDevice } from '@/domain/usecases'
import { DbCreateDevice } from '@/data/usecases'
import { DeviceMongoRepository } from '@/infra/db/mongodb'
import { UuidGeneratorAdapter } from '@/infra/identificationGenerator'

export const makeDbCreateDevice = (): CreateDevice => {
    const uuidGeneratorAdapter = new UuidGeneratorAdapter()
    const deviceMongoRepository = new DeviceMongoRepository()
    return new DbCreateDevice(uuidGeneratorAdapter, deviceMongoRepository)
}
