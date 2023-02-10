import { DeleteDeviceRepository } from '@/data/protocols'

export class DeleteDeviceRepositorySpy implements DeleteDeviceRepository {
    params: any
    result: any = true

    async delete(deviceIdentification: string): Promise<any> {
        this.params = deviceIdentification
        return this.result
    }
}
