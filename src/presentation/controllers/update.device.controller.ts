import { Controller } from '@/presentation/protocols/controller'
import { UpdateDevice } from '@/domain/usecases'
import { badRequest, serverError, ok, forbidden } from '../helpers/http.helper'
import { Validation } from '../protocols/validation'
import { HttpResponse } from '../protocols'

export class UpdateDeviceController implements Controller {
    constructor(
        private readonly validation: Validation,
        private readonly updateDevice: UpdateDevice
    ) { }

    async handle(data: UpdateDeviceController.Request): Promise<HttpResponse> {
        try {
            const error = this.validation.validate(data)
            if (error) {
                return badRequest(error)
            }
            const device = await this.updateDevice.handle(data)
            if (device.isError()) {
                return forbidden(device.value.details)
            }
            return ok(device.value)
        } catch (error) {
            return serverError(error)
        }
    }
}

export namespace UpdateDeviceController {
    export interface Request {
        accountId: string
        deviceIdentification: string
        deviceName: string
        deviceType: string
    }
}
