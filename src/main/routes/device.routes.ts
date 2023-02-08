import { adaptRoute } from '@/main/adapters'
import { makeCreateDeviceController } from '@/main/factories'

import { Router } from 'express'
import { auth } from '@/main/middlewares'

export default (router: Router): void => {
    router.post('/device', adaptRoute(makeCreateDeviceController()))
}
