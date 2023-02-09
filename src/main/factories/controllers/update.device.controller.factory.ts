import { UpdateDeviceController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { makeDbUpdateDevice, makeLogControllerDecorator, makeUpdateDeviceValidation } from '@/main/factories'

export const makeUpdateDeviceController = (): Controller => {
    const controller = new UpdateDeviceController(makeUpdateDeviceValidation(), makeDbUpdateDevice())
    return makeLogControllerDecorator(controller)
}
