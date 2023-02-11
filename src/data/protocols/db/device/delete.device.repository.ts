export interface DeleteDeviceRepository {
    delete: (deviceIdentification: string) => Promise<DeleteDeviceRepository.Result>
}

export namespace DeleteDeviceRepository {
    export type Result = boolean
}
