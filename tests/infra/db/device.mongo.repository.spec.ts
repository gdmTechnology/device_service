
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

    describe('CreateDeviceRepository', () => {
        test('Should create a device on success', async () => {
            const sut = makeSut()
            const device = await sut.save(createDeviceParams())
            expect(device).toBeTruthy()
        })
    })

    describe('UpdateDeviceRepository', () => {
        test('Should update a device on success', async () => {
            const sut = makeSut()
            const req = createDeviceParams()
            await sut.save(createDeviceParams())
            const updatedDvc = await sut.update({ ...req, deviceName: 'teste' })
            expect(updatedDvc.deviceName).toBe('teste')
        })

        test('Should return null if device was not found ', async () => {
            const sut = makeSut()
            const req = createDeviceParams()
            await sut.save(createDeviceParams())
            const updatedDvc = await sut.update({ ...req, deviceIdentification: 'invalid' })
            expect(updatedDvc).toBeNull()
        })
    })

    describe('GetDeviceRepository', () => {
        test('Should get a device on success', async () => {
            const sut = makeSut()
            const req = createDeviceParams()
            await sut.save(req)
            const updatedDvc = await sut.get('deviceIdentification')
            expect(updatedDvc.deviceIdentification).toBe('deviceIdentification')
        })

        test('Should return null if device was not found ', async () => {
            const sut = makeSut()
            const req = createDeviceParams()
            await sut.save(req)
            const dvc = await sut.get('invalid_deviceIdentification')
            expect(dvc).toBeNull()
        })
    })

    describe('ListDeviceRepository', () => {
        test('Should get a list of devices on success', async () => {
            const sut = makeSut()
            const req = createDeviceParams()
            await sut.save(req)
            const list = await sut.list('deviceTenantId')
            expect(list.length).toBe(1)
        })

        test('Should return empty array if devices was not found ', async () => {
            const sut = makeSut()
            const list = await sut.list('invalid_deviceIdentification')
            expect(list.length).toBe(0)
        })
    })

    describe('DeleteDeviceRepository', () => {
        test('Should return true if deleted devices succeds', async () => {
            const sut = makeSut()
            const req = createDeviceParams()
            await sut.save(req)
            const dvc = await sut.list('deviceIdentification')
            expect(dvc).toBeTruthy()
        })

        test('Should return false if deleted devices fails', async () => {
            const sut = makeSut()
            const dvc = await sut.delete('invalid_deviceIdentification')
            expect(dvc).toBeFalsy()
        })
    })
})
