import { ApplicationError, error } from '@/domain/protocols'
import { DeleteDeviceController } from '@/presentation/controllers'
import { DeleteDeviceSpy, ValidationSpy } from '../mocks'

const throwError = (): never => {
    throw new Error()
}

type SutTypes = {
    validationSpy: ValidationSpy
    deleteDeviceSpy: DeleteDeviceSpy
    sut: DeleteDeviceController
}
const makeSut = (): SutTypes => {
    const validationSpy = new ValidationSpy()
    const deleteDeviceSpy = new DeleteDeviceSpy()
    const sut = new DeleteDeviceController(validationSpy, deleteDeviceSpy)
    return {
        validationSpy,
        deleteDeviceSpy,
        sut
    }
}

const mockReq = (): DeleteDeviceController.Request => ({
    deviceIdentification: 'deviceIdentification'
})
describe('DeleteDeviceController', () => {
    test('Should call validation with correct values', async () => {
        const { sut, validationSpy } = makeSut()
        const request = mockReq()
        await sut.handle(request)
        expect(validationSpy.input).toEqual(request)
    })

    test('Should return 400 if validation fails', async () => {
        const { sut, validationSpy } = makeSut()
        const request = mockReq()
        validationSpy.error = new Error()
        const httpResponse = await sut.handle(request)
        expect(httpResponse.statusCode).toBe(400)
    })

    test('Should return 500 if validation throws', async () => {
        const { sut, validationSpy } = makeSut()
        const request = mockReq()
        jest.spyOn(validationSpy, 'validate').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle(request)
        expect(httpResponse.statusCode).toBe(500)
    })

    test('Should call deleteDevice with correct values', async () => {
        const { sut, deleteDeviceSpy } = makeSut()
        const request = mockReq()
        await sut.handle(request)
        expect(deleteDeviceSpy.input).toEqual(request)
    })

    test('Should return 400 if deleteDevice fails', async () => {
        const { sut, deleteDeviceSpy } = makeSut()
        const request = mockReq()
        const appError: ApplicationError = new ApplicationError('', '')
        deleteDeviceSpy.result = error(appError)
        const httpResponse = await sut.handle(request)
        expect(httpResponse.statusCode).toBe(400)
    })

    test('Should return 500 if deleteDevice throws', async () => {
        const { sut, deleteDeviceSpy } = makeSut()
        const request = mockReq()
        jest.spyOn(deleteDeviceSpy, 'handle').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle(request)
        expect(httpResponse.statusCode).toBe(500)
    })
})
