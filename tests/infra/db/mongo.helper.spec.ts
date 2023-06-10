import { MongoHelper } from '@/infra/db/mongodb/mongo.helper'

jest.mock('mongoose', () => ({ connect: () => true, disconnect: () => true }))

describe('Mongo Helper', () => {
    test('Should call connect', async () => {
        const call = jest.spyOn(MongoHelper, 'connect')
        await MongoHelper.connect('mongoUrl')
        expect(call).toBeCalled()
    })

    test('Should call disconnect', async () => {
        const call = jest.spyOn(MongoHelper, 'disconnect')
        await MongoHelper.disconnect()
        expect(call).toBeCalled()
    })
})
