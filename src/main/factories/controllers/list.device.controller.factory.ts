import { ListDeviceController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { makeDbListDevice, makeLogControllerDecorator, makeListDeviceValidation } from '@/main/factories'

export const makeListDeviceController = (): Controller => {
    const controller = new ListDeviceController(makeListDeviceValidation(), makeDbListDevice())
    return makeLogControllerDecorator(controller)
}
