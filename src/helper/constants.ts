export const Constants = {
    EmailInUseError: 'EmailInUseError',
    NotFoundTenantError: 'NotFoundTenantError',
    Forbidden: 'Forbidden',
    DuplicateError: {
        error: 'DatabaseUniqueConstraintError',
        message: 'Object already exists.',
        code: 11000
    },
    NotFoundDevice: {
        error: 'NotFoundDeviceError',
        message: 'Invalid device identification.'
    }
}
