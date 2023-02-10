import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'
import { Validation } from '@/presentation/protocols'

export const makeListDeviceValidation = (): ValidationComposite => {
    const validations: Validation[] = []
    for (const field of ['deviceTenantId']) {
        validations.push(new RequiredFieldValidation(field))
    }
    return new ValidationComposite(validations)
}
