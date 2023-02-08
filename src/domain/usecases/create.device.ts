import { ApplicationError, Either } from '../protocols'

export interface CreateDevice {
    handle: (data: CreateDevice.Request) => Promise<Either<ApplicationError, CreateDevice.Result>>
}

export namespace CreateDevice {
    export type Request = {
        accountId: string
        deviceTenantId: string
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
