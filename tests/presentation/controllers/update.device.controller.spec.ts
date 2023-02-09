import { ApplicationError, error } from '@/domain/protocols'
import { UpdateDeviceController } from '@/presentation/controllers'
import { UpdateDeviceSpy, ValidationSpy } from '../mocks'

const throwError = (): never => {
    throw new Error()
}

type SutTypes = {
    validationSpy: ValidationSpy
    updateDeviceSpy: UpdateDeviceSpy
    sut: UpdateDeviceController
}
const makeSut = (): SutTypes => {
    const validationSpy = new ValidationSpy()
    const updateDeviceSpy = new UpdateDeviceSpy()
    const sut = new UpdateDeviceController(validationSpy, updateDeviceSpy)
    return {
        validationSpy,
        updateDeviceSpy,
        sut
    }
}

const mockReq = (): UpdateDeviceController.Request => ({
    accountId: 'accountId',
    deviceIdentification: 'deviceIdentification',
    deviceName: 'deviceName',
    deviceType: 'deviceType'
})
describe('UpdateDeviceController', () => {
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

    test('Should call updateDevice with correct values', async () => {
        const { sut, updateDeviceSpy } = makeSut()
        const request = mockReq()
        await sut.handle(request)
        expect(updateDeviceSpy.input).toEqual(request)
    })

    test('Should return 400 if updateDevice fails', async () => {
        const { sut, updateDeviceSpy } = makeSut()
        const request = mockReq()
        const appError: ApplicationError = new ApplicationError('', '')
        updateDeviceSpy.result = error(appError)
        const httpResponse = await sut.handle(request)
        expect(httpResponse.statusCode).toBe(400)
    })

    test('Should return 500 if updateDevice throws', async () => {
        const { sut, updateDeviceSpy } = makeSut()
        const request = mockReq()
        jest.spyOn(updateDeviceSpy, 'handle').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle(request)
        expect(httpResponse.statusCode).toBe(500)
    })
})
