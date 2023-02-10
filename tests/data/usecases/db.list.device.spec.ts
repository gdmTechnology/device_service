import { DbListDevice } from '@/data/usecases'
import { ListDevice } from '@/domain/usecases'
import { ListDeviceRepositorySpy } from '@/tests/data/mocks'

type SutTypes = {
    listDeviceRepositorySpy: ListDeviceRepositorySpy
    sut: DbListDevice
}

const throwError = (): never => {
    throw new Error()
}

const makeSut = (): SutTypes => {
    const listDeviceRepositorySpy = new ListDeviceRepositorySpy()
    const sut = new DbListDevice(listDeviceRepositorySpy)
    return { sut, listDeviceRepositorySpy }
}

const mockRequest = (): ListDevice.Request => ({
    deviceTenantId: 'deviceTenantId'
})

describe('DbGetDevice', () => {
    test('Should call ListDeviceRepository with correct values', async () => {
        const { sut, listDeviceRepositorySpy } = makeSut()
        const request = mockRequest()
        await sut.handle(request)
        expect(listDeviceRepositorySpy.params).toEqual(request.deviceTenantId)
    })

    test('Should return sensor if ListDeviceRepository succeds', async () => {
        const { sut } = makeSut()
        const request = mockRequest()
        const result = await sut.handle(request)
        expect(result.isError()).toBeFalsy()
    })

    test('Should throw if ListDeviceRepository throws', async () => {
        const { sut, listDeviceRepositorySpy } = makeSut()
        jest.spyOn(listDeviceRepositorySpy, 'list').mockImplementationOnce(throwError)
        const request = mockRequest()
        const promise = sut.handle(request)
        await expect(promise).rejects.toThrow()
    })

    test('Should return empty if ListDeviceRepository returns empty', async () => {
        const { sut, listDeviceRepositorySpy } = makeSut()
        listDeviceRepositorySpy.result = []
        const request = mockRequest()
        const result = await sut.handle(request)
        if (result.isSuccess()) expect(result.value.length).toBe(0)
    })
})
