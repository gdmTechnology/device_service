import { GetDeviceController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { makeDbGetDevice, makeLogControllerDecorator, makeGetDeviceValidation } from '@/main/factories'

export const makeGetDeviceController = (): Controller => {
    const controller = new GetDeviceController(makeGetDeviceValidation(), makeDbGetDevice())
    return makeLogControllerDecorator(controller)
}
