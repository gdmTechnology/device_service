import { Controller } from '@/presentation/protocols/controller'
import { DeleteDevice } from '@/domain/usecases'
import { badRequest, serverError, noContent } from '../helpers/http.helper'
import { Validation } from '../protocols/validation'

export class DeleteDeviceController implements Controller {
    constructor(
        private readonly validation: Validation,
        private readonly deleteDevice: DeleteDevice
    ) { }

    async handle(data: DeleteDeviceController.Request): Promise<any> {
        try {
            const error = this.validation.validate(data)
            if (error) {
                return badRequest(error)
            }
            const device = await this.deleteDevice.handle(data)
            if (device.isError()) {
                return badRequest(device.value.details)
            }
            return noContent()
        } catch (error) {
            return serverError(error)
        }
    }
}

export namespace DeleteDeviceController {
    export interface Request {
        deviceIdentification: string
    }
}
