import { UpdateDevice } from '@/domain/usecases'

export interface UpdateDeviceRepository {
    update: (data: UpdateDeviceRepository.Params) => Promise<UpdateDeviceRepository.Result>
}

export namespace UpdateDeviceRepository {
    export type Params = {
        accountId: string
        deviceIdentification: string
        deviceName: string
        deviceType: string
    }
    export type Result = UpdateDevice.Result | null
}
