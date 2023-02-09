import { DbUpdateDevice } from '@/data/usecases'
import { UpdateDevice } from '@/domain/usecases'
import { UpdateDeviceRepositorySpy } from '@/tests/data/mocks'

type SutTypes = {
    updateDeviceRepositorySpy: UpdateDeviceRepositorySpy
    sut: DbUpdateDevice
}

const throwError = (): never => {
    throw new Error()
}

const makeSut = (): SutTypes => {
    const updateDeviceRepositorySpy = new UpdateDeviceRepositorySpy()
    const sut = new DbUpdateDevice(updateDeviceRepositorySpy)
    return { sut, updateDeviceRepositorySpy }
}

const mockRequest = (): UpdateDevice.Request => ({
    accountId: 'accountId',
    deviceIdentification: 'deviceIdentification',
    deviceName: 'deviceName',
    deviceType: 'deviceType'
})

describe('DbUpdateDevice', () => {
    test('Should call UpdateDeviceRepository with correct values', async () => {
        const { sut, updateDeviceRepositorySpy } = makeSut()
        const request = mockRequest()
        await sut.handle(request)
        expect(updateDeviceRepositorySpy.params).toEqual({ ...request, deviceIdentification: 'deviceIdentification' })
    })

    test('Should return sensor if UpdateDeviceRepository succeds', async () => {
        const { sut } = makeSut()
        const request = mockRequest()
        const result = await sut.handle(request)
        expect(result.isError()).toBeFalsy()
    })

    test('Should throw if UpdateDeviceRepository throws', async () => {
        const { sut, updateDeviceRepositorySpy } = makeSut()
        jest.spyOn(updateDeviceRepositorySpy, 'update').mockImplementationOnce(throwError)
        const request = mockRequest()
        const promise = sut.handle(request)
        await expect(promise).rejects.toThrow()
    })

    test('Should return null if UpdateDeviceRepository fails', async () => {
        const { sut, updateDeviceRepositorySpy } = makeSut()
        updateDeviceRepositorySpy.result = null
        const request = mockRequest()
        const result = await sut.handle(request)
        expect(result.isError()).toBeTruthy()
    })
})
