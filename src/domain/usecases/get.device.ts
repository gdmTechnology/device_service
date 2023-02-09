import { ApplicationError, Either } from '../protocols'

export interface GetDevice {
    handle: (data: GetDevice.Request) => Promise<Either<ApplicationError, GetDevice.Result>>
}

export namespace GetDevice {
    export type Request = {
        deviceIdentification: string
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
