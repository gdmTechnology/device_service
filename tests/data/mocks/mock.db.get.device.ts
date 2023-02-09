import { GetDeviceRepository } from '@/data/protocols'

export class GetDeviceRepositorySpy implements GetDeviceRepository {
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

    async get(deviceIdentification: string): Promise<any> {
        this.params = deviceIdentification
        return this.result
    }
}
