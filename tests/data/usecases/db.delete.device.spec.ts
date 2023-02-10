import { DbDeleteDevice } from '@/data/usecases'
import { DeleteDevice } from '@/domain/usecases'
import { DeleteDeviceRepositorySpy } from '@/tests/data/mocks'

type SutTypes = {
    deleteDeviceRepositorySpy: DeleteDeviceRepositorySpy
    sut: DbDeleteDevice
}

const throwError = (): never => {
    throw new Error()
}

const makeSut = (): SutTypes => {
    const deleteDeviceRepositorySpy = new DeleteDeviceRepositorySpy()
    const sut = new DbDeleteDevice(deleteDeviceRepositorySpy)
    return { sut, deleteDeviceRepositorySpy }
}

const mockRequest = (): DeleteDevice.Request => ({
    deviceIdentification: 'deviceIdentification'
})

describe('DbDeleteDevice', () => {
    test('Should call DeleteDeviceRepository with correct values', async () => {
        const { sut, deleteDeviceRepositorySpy } = makeSut()
        const request = mockRequest()
        await sut.handle(request)
        expect(deleteDeviceRepositorySpy.params).toEqual(request.deviceIdentification)
    })

    test('Should return sensor if DeleteDeviceRepository succeds', async () => {
        const { sut } = makeSut()
        const request = mockRequest()
        const result = await sut.handle(request)
        expect(result.isError()).toBeFalsy()
    })

    test('Should throw if DeleteDeviceRepository throws', async () => {
        const { sut, deleteDeviceRepositorySpy } = makeSut()
        jest.spyOn(deleteDeviceRepositorySpy, 'delete').mockImplementationOnce(throwError)
        const request = mockRequest()
        const promise = sut.handle(request)
        await expect(promise).rejects.toThrow()
    })

    test('Should return false if DeleteDeviceRepository fails', async () => {
        const { sut, deleteDeviceRepositorySpy } = makeSut()
        deleteDeviceRepositorySpy.result = null
        const request = mockRequest()
        const result = await sut.handle(request)
        expect(result.isError()).toBeTruthy()
    })
})
