import { DbGetDevice } from '@/data/usecases'
import { GetDevice } from '@/domain/usecases'
import { GetDeviceRepositorySpy } from '@/tests/data/mocks'

type SutTypes = {
    getDeviceRepositorySpy: GetDeviceRepositorySpy
    sut: DbGetDevice
}

const throwError = (): never => {
    throw new Error()
}

const makeSut = (): SutTypes => {
    const getDeviceRepositorySpy = new GetDeviceRepositorySpy()
    const sut = new DbGetDevice(getDeviceRepositorySpy)
    return { sut, getDeviceRepositorySpy }
}

const mockRequest = (): GetDevice.Request => ({
    deviceIdentification: 'deviceIdentification'
})

describe('DbGetDevice', () => {
    test('Should call GetDeviceRepository with correct values', async () => {
        const { sut, getDeviceRepositorySpy } = makeSut()
        const request = mockRequest()
        await sut.handle(request)
        expect(getDeviceRepositorySpy.params).toEqual(request.deviceIdentification)
    })

    test('Should return sensor if GetDeviceRepository succeds', async () => {
        const { sut } = makeSut()
        const request = mockRequest()
        const result = await sut.handle(request)
        expect(result.isError()).toBeFalsy()
    })

    test('Should throw if GetDeviceRepository throws', async () => {
        const { sut, getDeviceRepositorySpy } = makeSut()
        jest.spyOn(getDeviceRepositorySpy, 'get').mockImplementationOnce(throwError)
        const request = mockRequest()
        const promise = sut.handle(request)
        await expect(promise).rejects.toThrow()
    })

    test('Should return null if GetDeviceRepository fails', async () => {
        const { sut, getDeviceRepositorySpy } = makeSut()
        getDeviceRepositorySpy.result = null
        const request = mockRequest()
        const result = await sut.handle(request)
        expect(result.isError()).toBeTruthy()
    })
})
