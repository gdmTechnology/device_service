import { ApplicationError, error } from '@/domain/protocols'
import { ListDeviceController } from '@/presentation/controllers'
import { ListDeviceSpy, ValidationSpy } from '../mocks'

const throwError = (): never => {
    throw new Error()
}

type SutTypes = {
    validationSpy: ValidationSpy
    listDeviceSpy: ListDeviceSpy
    sut: ListDeviceController
}
const makeSut = (): SutTypes => {
    const validationSpy = new ValidationSpy()
    const listDeviceSpy = new ListDeviceSpy()
    const sut = new ListDeviceController(validationSpy, listDeviceSpy)
    return {
        validationSpy,
        listDeviceSpy,
        sut
    }
}

const mockReq = (): ListDeviceController.Request => ({
    deviceTenantId: 'deviceTenantId'
})
describe('ListDeviceController', () => {
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

    test('Should call ListDevice with correct values', async () => {
        const { sut, listDeviceSpy } = makeSut()
        const request = mockReq()
        await sut.handle(request)
        expect(listDeviceSpy.input).toEqual(request)
    })

    test('Should return 400 if ListDevice fails', async () => {
        const { sut, listDeviceSpy } = makeSut()
        const request = mockReq()
        const appError: ApplicationError = new ApplicationError('', '')
        listDeviceSpy.result = error(appError)
        const httpResponse = await sut.handle(request)
        expect(httpResponse.statusCode).toBe(400)
    })

    test('Should return 500 if ListDevice throws', async () => {
        const { sut, listDeviceSpy } = makeSut()
        const request = mockReq()
        jest.spyOn(listDeviceSpy, 'handle').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle(request)
        expect(httpResponse.statusCode).toBe(500)
    })
})
