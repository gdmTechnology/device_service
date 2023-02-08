import { DbCreateDevice } from '@/data/usecases'
import { CreateDevice } from '@/domain/usecases'
import { CreateUuidSpy, CreateDeviceRepositorySpy } from '@/tests/data/mocks'

type SutTypes = {
    createUuidSpy: CreateUuidSpy
    createDeviceRepositorySpy: CreateDeviceRepositorySpy
    sut: DbCreateDevice
}

const throwError = (): never => {
    throw new Error()
}

const makeSut = (): SutTypes => {
    const createUuidSpy = new CreateUuidSpy()
    const createDeviceRepositorySpy = new CreateDeviceRepositorySpy()
    const sut = new DbCreateDevice(createUuidSpy, createDeviceRepositorySpy)
    return { sut, createUuidSpy, createDeviceRepositorySpy }
}

const mockRequest = (): CreateDevice.Request => ({
    accountId: 'accountId',
    deviceTenantId: 'deviceTenantId',
    deviceName: 'deviceName',
    deviceType: 'deviceType'
})

describe('DbCreateSensor', () => {
    test('Should throw if CreateUuid throws', async () => {
        const { sut, createUuidSpy } = makeSut()
        const request = mockRequest()
        jest.spyOn(createUuidSpy, 'create').mockImplementationOnce(throwError)
        const promise = sut.handle(request)
        await expect(promise).rejects.toThrow()
    })

    test('Should call CreateDeviceRepository with correct values', async () => {
        const { sut, createDeviceRepositorySpy } = makeSut()
        const request = mockRequest()
        await sut.handle(request)
        expect(createDeviceRepositorySpy.params).toEqual({ ...request, deviceIdentification: 'any_id' })
    })

    test('Should return sensor if CreateDeviceRepository succeds', async () => {
        const { sut } = makeSut()
        const request = mockRequest()
        const result = await sut.handle(request)
        expect(result.isError()).toBeFalsy()
    })

    test('Should throw if CreateDeviceRepository throws', async () => {
        const { sut, createDeviceRepositorySpy } = makeSut()
        jest.spyOn(createDeviceRepositorySpy, 'save').mockImplementationOnce(throwError)
        const request = mockRequest()
        const promise = sut.handle(request)
        await expect(promise).rejects.toThrow()
    })

    test('Should return null if CreateDeviceRepository fails', async () => {
        const { sut, createDeviceRepositorySpy } = makeSut()
        createDeviceRepositorySpy.result = null
        const request = mockRequest()
        const result = await sut.handle(request)
        expect(result.isError()).toBeTruthy()
    })
})
