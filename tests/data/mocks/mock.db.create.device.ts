import { CreateUuid, CreateDeviceRepository } from '@/data/protocols'

export class CreateUuidSpy implements CreateUuid {
    id = 'any_id'

    create(): string {
        return this.id
    }
}

export class CreateDeviceRepositorySpy implements CreateDeviceRepository {
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

    async save(params: CreateDeviceRepository.Params): Promise<CreateDeviceRepository.Result> {
        this.params = params
        return this.result
    }
}
