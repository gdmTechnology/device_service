import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'
import { Validation } from '@/presentation/protocols'

export const makeGetDeviceValidation = (): ValidationComposite => {
    const validations: Validation[] = []
    for (const field of ['deviceIdentification']) {
        validations.push(new RequiredFieldValidation(field))
    }
    return new ValidationComposite(validations)
}
