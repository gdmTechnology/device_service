import { AccountMongoRepository } from '@/infra/db/mongodb'
import { MongoTestDbHelper } from './db.handler'
import { AccountModel } from '@/infra/db/mongodb/models'

const makeSut = (): AccountMongoRepository => {
    return new AccountMongoRepository()
}

const newAcc = {
    identification: 'identification',
    email: 'email',
    password: 'password',
    name: 'name',
    lastName: 'lastName',
    birthDate: new Date(),
    tellphone: 'tellphone',
    cellphone: 'cellphone',
    streetAddress: 'streetAddress',
    numberAddress: 'numberAddress',
    districtAddress: 'districtAddress',
    cityAddress: 'cityAddress',
    stateAddress: 'stateAddress',
    accessToken: 'accessToken',
    role: 'admin'
}

const createAccount = async (): Promise<void> => {
    await AccountModel.create(newAcc)
}

describe('AccountMongoRepository', () => {
    beforeAll(async () => await MongoTestDbHelper.connect())
    afterEach(async () => await MongoTestDbHelper.clearDatabase())
    afterAll(async () => await MongoTestDbHelper.disconnect())

    describe('save()', () => {
        test('Should return an account on success', async () => {
            await createAccount()
            const sut = makeSut()
            const account = await sut.load({ accessToken: newAcc.accessToken, role: newAcc.role })
            expect(account.identification).toBe(newAcc.identification)
        })

        test('Should return null on fail', async () => {
            await createAccount()
            const sut = makeSut()
            const account = await sut.load({ accessToken: '', role: newAcc.role })
            expect(account).toBeNull()
        })
    })
})
