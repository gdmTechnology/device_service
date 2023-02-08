import { CreateDevice } from '@/domain/usecases'
import { CreateUuid, CreateDeviceRepository } from '@/data/protocols'
import { ApplicationError, Either, error, success } from '@/domain/protocols'
import { Constants } from '@/helper'

export class DbCreateDevice implements CreateDevice {
    constructor(
        private readonly createUuid: CreateUuid,
        private readonly createDeviceRepository: CreateDeviceRepository
    ) { }

    async handle(data: CreateDevice.Request): Promise<Either<ApplicationError, CreateDevice.Result>> {
        const deviceIdentification = this.createUuid.create()
        const device = await this.createDeviceRepository.save({ ...data, deviceIdentification })
        if (!device) {
            const appError = new ApplicationError(
                Constants.DuplicateError.error,
                Constants.DuplicateError.message
            )
            return error(appError)
        }
        return success(device)
    }
}
