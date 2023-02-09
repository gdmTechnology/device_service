import { GetDevice } from '@/domain/usecases'

export interface GetDeviceRepository {
    get: (deviceIdentification: string) => Promise<GetDeviceRepository.Result>
}

export namespace GetDeviceRepository {
    export type Result = GetDevice.Result | null
}
