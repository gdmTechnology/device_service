import { ApplicationError, Either } from '../protocols'

export interface UpdateDevice {
    handle: (data: UpdateDevice.Request) => Promise<Either<ApplicationError, UpdateDevice.Result>>
}

export namespace UpdateDevice {
    export type Request = {
        accountId: string
        deviceIdentification: string
        deviceName: string
        deviceType: string
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
