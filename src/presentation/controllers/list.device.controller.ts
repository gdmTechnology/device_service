import { Controller } from '@/presentation/protocols/controller'
import { ListDevice } from '@/domain/usecases'
import { badRequest, serverError, ok } from '../helpers/http.helper'
import { Validation } from '../protocols/validation'

export class ListDeviceController implements Controller {
    constructor(
        private readonly validation: Validation,
        private readonly listDevice: ListDevice
    ) { }

    async handle(data: ListDeviceController.Request): Promise<any> {
        try {
            const error = this.validation.validate(data)
            if (error) {
                return badRequest(error)
            }
            const device = await this.listDevice.handle(data)
            if (device.isError()) {
                return badRequest(device.value.details)
            }
            return ok(device.value)
        } catch (error) {
            return serverError(error)
        }
    }
}

export namespace ListDeviceController {
    export interface Request {
        deviceTenantId: string
    }
}
