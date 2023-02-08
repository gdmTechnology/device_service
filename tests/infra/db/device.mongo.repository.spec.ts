
import { CreateDeviceRepository } from '@/data/protocols'
import { DeviceMongoRepository } from '@/infra/db/mongodb'
import { MongoTestDbHelper } from './db.handler'

const makeSut = (): DeviceMongoRepository => {
    return new DeviceMongoRepository()
}

const createDeviceParams = (): CreateDeviceRepository.Params => ({
    accountId: 'accountId',
    deviceTenantId: 'deviceTenantId',
    deviceIdentification: 'deviceIdentification',
    deviceName: 'deviceName',
    deviceType: 'deviceType'
})

describe('DeviceMongoRepository', () => {
    beforeAll(async () => await MongoTestDbHelper.connect())
    afterEach(async () => await MongoTestDbHelper.clearDatabase())
    afterAll(async () => await MongoTestDbHelper.disconnect())

    test('Should create a device on success', async () => {
        const sut = makeSut()
        const device = await sut.save(createDeviceParams())
        expect(device).toBeTruthy()
    })
})
