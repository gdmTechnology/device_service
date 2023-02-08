import { CreateDeviceController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { makeDbCreateDevice, makeLogControllerDecorator, makeCreateDeviceValidation } from '@/main/factories'

export const makeCreateDeviceController = (): Controller => {
    const controller = new CreateDeviceController(makeCreateDeviceValidation(), makeDbCreateDevice())
    return makeLogControllerDecorator(controller)
}
