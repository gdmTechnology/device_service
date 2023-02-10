import { ListDevice } from '@/domain/usecases'
import { ListDeviceRepository } from '@/data/protocols'
import { ApplicationError, Either, success } from '@/domain/protocols'

export class DbListDevice implements ListDevice {
    constructor(
        private readonly listDeviceRepository: ListDeviceRepository
    ) { }

    async handle(data: ListDevice.Request): Promise<Either<ApplicationError, ListDevice.Result[]>> {
        const { deviceTenantId } = data
        const device = await this.listDeviceRepository.list(deviceTenantId)
        return success(device)
    }
}
