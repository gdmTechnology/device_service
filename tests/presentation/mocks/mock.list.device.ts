import { success } from '@/domain/protocols'
import { GetDevice } from '@/domain/usecases'

export class ListDeviceSpy implements GetDevice {
    result = success([{
        accountId: 'accountId',
        deviceIdentification: 'deviceIdentification',
        deviceTenantId: 'deviceTenantId',
        deviceName: 'deviceName',
        deviceType: 'deviceType',
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }])

    input: any

    async handle(input: any): Promise<any> {
        this.input = input
        return this.result
    }
}
