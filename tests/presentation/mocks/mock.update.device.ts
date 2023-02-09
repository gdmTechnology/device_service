import { success } from '@/domain/protocols'
import { UpdateDevice } from '@/domain/usecases'

export class UpdateDeviceSpy implements UpdateDevice {
    result = success({
        accountId: 'accountId',
        deviceIdentification: 'deviceIdentification',
        deviceTenantId: 'deviceTenantId',
        deviceName: 'deviceName',
        deviceType: 'deviceType',
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    })

    input: any

    async handle(input: any): Promise<any> {
        this.input = input
        return this.result
    }
}
