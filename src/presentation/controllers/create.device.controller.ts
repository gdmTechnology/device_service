import { Controller } from '@/presentation/protocols/controller'
import { CreateDevice } from '@/domain/usecases'
import { badRequest, serverError, ok } from '../helpers/http.helper'
import { Validation } from '../protocols/validation'

export class CreateDeviceController implements Controller {
    constructor(
        private readonly validation: Validation,
        private readonly createDevice: CreateDevice
    ) { }

    async handle(data: CreateDeviceController.Request): Promise<any> {
        try {
            const error = this.validation.validate(data)
            if (error) {
                return badRequest(error)
            }
            const device = await this.createDevice.handle(data)
            if (device.isError()) {
                return badRequest(device.value.details)
            }
            return ok(device.value)
        } catch (error) {
            return serverError(error)
        }
    }
}

export namespace CreateDeviceController {
    export interface Request {
        accountId: string
        deviceTenantId: string
        deviceName: string
        deviceType: string
    }
}
