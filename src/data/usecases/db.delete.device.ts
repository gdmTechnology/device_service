import { DeleteDevice } from '@/domain/usecases'
import { DeleteDeviceRepository } from '@/data/protocols'
import { ApplicationError, Either, error, success } from '@/domain/protocols'
import { Constants } from '@/helper'

export class DbDeleteDevice implements DeleteDevice {
    constructor(
        private readonly deleteDeviceRepository: DeleteDeviceRepository
    ) { }

    async handle(data: DeleteDevice.Request): Promise<Either<ApplicationError, DeleteDevice.Result>> {
        const { deviceIdentification } = data
        const device = await this.deleteDeviceRepository.delete(deviceIdentification)
        if (!device) {
            const appError = new ApplicationError(
                Constants.NotFoundDevice.error,
                Constants.NotFoundDevice
            )
            return error(appError)
        }
        return success(device)
    }
}
