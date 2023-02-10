import { ApplicationError, Either } from '../protocols'

export interface DeleteDevice {
    handle: (data: DeleteDevice.Request) => Promise<Either<ApplicationError, DeleteDevice.Result>>
}

export namespace DeleteDevice {
    export type Request = {
        deviceIdentification: string
    }
    export type Result = boolean
}
