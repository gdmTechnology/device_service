export const Constants = {
    EmailInUseError: 'EmailInUseError',
    NotFoundTenantError: 'NotFoundTenantError',
    Forbidden: 'Forbidden',
    DuplicateError: {
        error: 'DatabaseUniqueConstraintError',
        message: 'Object already exists.',
        code: 11000
    },
    NotFoundSensor: {
        error: 'NotFoundSensorError',
        message: 'Not found sensor identification.'
    }
}
