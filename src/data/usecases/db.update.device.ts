import { UpdateDevice } from '@/domain/usecases'
import { UpdateDeviceRepository } from '@/data/protocols'
import { ApplicationError, Either, error, success } from '@/domain/protocols'
import { Constants } from '@/helper'

export class DbUpdateDevice implements UpdateDevice {
    constructor(
        private readonly updateDeviceRepository: UpdateDeviceRepository
    ) { }

    async handle(data: UpdateDevice.Request): Promise<Either<ApplicationError, UpdateDevice.Result>> {
        const device = await this.updateDeviceRepository.update(data)
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
