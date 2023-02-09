import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'
import { Validation } from '@/presentation/protocols'

export const makeUpdateDeviceValidation = (): ValidationComposite => {
    const validations: Validation[] = []
    for (const field of ['accountId', 'deviceIdentification', 'deviceName', 'deviceType']) {
        validations.push(new RequiredFieldValidation(field))
    }
    return new ValidationComposite(validations)
}
