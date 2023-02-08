import { CreateDevice } from '@/domain/usecases'

export interface CreateDeviceRepository {
    save: (data: CreateDeviceRepository.Params) => Promise<CreateDeviceRepository.Result>
}

export namespace CreateDeviceRepository {
    export type Params = {
        accountId: string
        deviceTenantId: string
        deviceIdentification: string
        deviceName: string
        deviceType: string
    }
    export type Result = CreateDevice.Result | null
}
