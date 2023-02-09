import { adaptRoute } from '@/main/adapters'
import { makeCreateDeviceController, makeUpdateDeviceController } from '@/main/factories'

import { Router } from 'express'
import { auth } from '@/main/middlewares'

export default (router: Router): void => {
    router.post('/device', auth, adaptRoute(makeCreateDeviceController()))
    router.put('/device', auth, adaptRoute(makeUpdateDeviceController()))
}
