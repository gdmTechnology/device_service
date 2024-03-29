import env from '@/main/config/env'
import { LoadAccountByToken } from '@/domain/usecases'
import { DbLoadAccountByToken } from '@/data/usecases'
import { AccountMongoRepository } from '@/infra/db/mongodb'
import { JwtAdapter } from '@/infra/cryptography'

export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
    const jwtAdapter = new JwtAdapter(env.jwtSecret)
    const loadAccountByTokenRepository = new AccountMongoRepository()
    return new DbLoadAccountByToken(jwtAdapter, loadAccountByTokenRepository)
}
