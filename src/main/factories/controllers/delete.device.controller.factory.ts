import { DeleteDeviceController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { makeDbDeleteDevice, makeLogControllerDecorator, makeDeleteDeviceValidation } from '@/main/factories'

export const makeDeleteDeviceController = (): Controller => {
    const controller = new DeleteDeviceController(makeDeleteDeviceValidation(), makeDbDeleteDevice())
    return makeLogControllerDecorator(controller)
}
