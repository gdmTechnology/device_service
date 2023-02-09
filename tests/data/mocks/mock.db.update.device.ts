import { UpdateDeviceRepository } from '@/data/protocols'

export class UpdateDeviceRepositorySpy implements UpdateDeviceRepository {
    params: any
    result: any = {
        accountId: 'accountId',
        deviceIdentification: 'deviceIdentification',
        deviceTenantId: 'deviceTenantId',
        deviceName: 'deviceName',
        deviceType: 'deviceType',
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }

    async update(params: UpdateDeviceRepository.Params): Promise<any> {
        this.params = params
        return this.result
    }
}
