import { ListDeviceRepository } from '@/data/protocols'

export class ListDeviceRepositorySpy implements ListDeviceRepository {
    params: any
    result: any = [{
        accountId: 'accountId',
        deviceIdentification: 'deviceIdentification',
        deviceTenantId: 'deviceTenantId',
        deviceName: 'deviceName',
        deviceType: 'deviceType',
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }]

    async list(deviceTenantId: string): Promise<any> {
        this.params = deviceTenantId
        return this.result
    }
}
