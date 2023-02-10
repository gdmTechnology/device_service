import { ListDevice } from '@/domain/usecases'

export interface ListDeviceRepository {
    list: (deviceTenantId: string) => Promise<ListDeviceRepository.Result[]>
}

export namespace ListDeviceRepository {
    export type Result = ListDevice.Result
}
