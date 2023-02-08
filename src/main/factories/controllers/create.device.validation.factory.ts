import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'
import { Validation } from '@/presentation/protocols'

export const makeCreateDeviceValidation = (): ValidationComposite => {
    const validations: Validation[] = []
    for (const field of ['accountId', 'deviceTenantId', 'deviceName', 'deviceType']) {
        validations.push(new RequiredFieldValidation(field))
    }
    return new ValidationComposite(validations)
}
