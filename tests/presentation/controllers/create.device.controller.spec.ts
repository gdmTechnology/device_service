import { ApplicationError, error } from '@/domain/protocols'
import { CreateDeviceController } from '@/presentation/controllers'
import { CreateDeviceSpy, ValidationSpy } from '../mocks'

const throwError = (): never => {
    throw new Error()
}

type SutTypes = {
    validationSpy: ValidationSpy
    createDeviceSpy: CreateDeviceSpy
    sut: CreateDeviceController
}
const makeSut = (): SutTypes => {
    const validationSpy = new ValidationSpy()
    const createDeviceSpy = new CreateDeviceSpy()
    const sut = new CreateDeviceController(validationSpy, createDeviceSpy)
    return {
        validationSpy,
        createDeviceSpy,
        sut
    }
}

const mockReq = (): CreateDeviceController.Request => ({
    accountId: 'accountId',
    deviceTenantId: 'deviceTenantId',
    deviceName: 'deviceName',
    deviceType: 'deviceType'
})
describe('CreateDeviceController', () => {
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

    test('Should call createDevice with correct values', async () => {
        const { sut, createDeviceSpy } = makeSut()
        const request = mockReq()
        await sut.handle(request)
        expect(createDeviceSpy.input).toEqual(request)
    })

    test('Should return 400 if createDevice fails', async () => {
        const { sut, createDeviceSpy } = makeSut()
        const request = mockReq()
        const appError: ApplicationError = new ApplicationError('', '')
        createDeviceSpy.result = error(appError)
        const httpResponse = await sut.handle(request)
        expect(httpResponse.statusCode).toBe(400)
    })

    test('Should return 500 if createDevice throws', async () => {
        const { sut, createDeviceSpy } = makeSut()
        const request = mockReq()
        jest.spyOn(createDeviceSpy, 'handle').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle(request)
        expect(httpResponse.statusCode).toBe(500)
    })
})
