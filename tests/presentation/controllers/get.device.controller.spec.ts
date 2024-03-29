import { ApplicationError, error } from '@/domain/protocols'
import { GetDeviceController } from '@/presentation/controllers'
import { GetDeviceSpy, ValidationSpy } from '../mocks'

const throwError = (): never => {
    throw new Error()
}

type SutTypes = {
    validationSpy: ValidationSpy
    getDeviceSpy: GetDeviceSpy
    sut: GetDeviceController
}
const makeSut = (): SutTypes => {
    const validationSpy = new ValidationSpy()
    const getDeviceSpy = new GetDeviceSpy()
    const sut = new GetDeviceController(validationSpy, getDeviceSpy)
    return {
        validationSpy,
        getDeviceSpy,
        sut
    }
}

const mockReq = (): GetDeviceController.Request => ({
    deviceIdentification: 'deviceIdentification'
})
describe('GetDeviceController', () => {
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

    test('Should call GetDevice with correct values', async () => {
        const { sut, getDeviceSpy } = makeSut()
        const request = mockReq()
        await sut.handle(request)
        expect(getDeviceSpy.input).toEqual(request)
    })

    test('Should return 400 if GetDevice fails', async () => {
        const { sut, getDeviceSpy } = makeSut()
        const request = mockReq()
        const appError: ApplicationError = new ApplicationError('', '')
        getDeviceSpy.result = error(appError)
        const httpResponse = await sut.handle(request)
        expect(httpResponse.statusCode).toBe(400)
    })

    test('Should return 500 if GetDevice throws', async () => {
        const { sut, getDeviceSpy } = makeSut()
        const request = mockReq()
        jest.spyOn(getDeviceSpy, 'handle').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle(request)
        expect(httpResponse.statusCode).toBe(500)
    })
})
