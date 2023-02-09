import { Controller } from '@/presentation/protocols/controller'
import { GetDevice } from '@/domain/usecases'
import { badRequest, serverError, ok } from '../helpers/http.helper'
import { Validation } from '../protocols/validation'

export class GetDeviceController implements Controller {
    constructor(
        private readonly validation: Validation,
        private readonly getDevice: GetDevice
    ) { }

    async handle(data: GetDeviceController.Request): Promise<any> {
        try {
            const error = this.validation.validate(data)
            if (error) {
                return badRequest(error)
            }
            const device = await this.getDevice.handle(data)
            if (device.isError()) {
                return badRequest(device.value.details)
            }
            return ok(device.value)
        } catch (error) {
            return serverError(error)
        }
    }
}

export namespace GetDeviceController {
    export interface Request {
        deviceIdentification: string
    }
}
