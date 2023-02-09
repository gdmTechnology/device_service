import { GetDevice } from '@/domain/usecases'
import { GetDeviceRepository } from '@/data/protocols'
import { ApplicationError, Either, error, success } from '@/domain/protocols'
import { Constants } from '@/helper'

export class DbGetDevice implements GetDevice {
    constructor(
        private readonly getDeviceRepository: GetDeviceRepository
    ) { }

    async handle(data: GetDevice.Request): Promise<Either<ApplicationError, GetDevice.Result>> {
        const { deviceIdentification } = data
        const device = await this.getDeviceRepository.get(deviceIdentification)
        if (!device) {
            const appError = new ApplicationError(
                Constants.DuplicateError.error,
                Constants.DuplicateError
            )
            return error(appError)
        }
        return success(device)
    }
}
