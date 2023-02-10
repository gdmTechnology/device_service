import { ApplicationError, Either } from '../protocols'

export interface ListDevice {
    handle: (data: ListDevice.Request) => Promise<Either<ApplicationError, ListDevice.Result[]>>
}

export namespace ListDevice {
    export type Request = {
        deviceTenantId: string
    }
    export type Result = {
        accountId: string
        deviceIdentification: string
        deviceTenantId: string
        deviceName: string
        deviceType: string
        createdAt: Date
        updatedAt: Date
    }
}
