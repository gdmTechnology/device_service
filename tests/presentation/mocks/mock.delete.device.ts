import { success } from '@/domain/protocols'
import { DeleteDevice } from '@/domain/usecases'

export class DeleteDeviceSpy implements DeleteDevice {
    result = success('')

    input: any

    async handle(input: any): Promise<any> {
        this.input = input
        return this.result
    }
}
