import { adaptRoute } from '@/main/adapters'
import { makeCreateDeviceController, makeUpdateDeviceController, makeGetDeviceController, makeListDeviceController } from '@/main/factories'

import { Router } from 'express'
import { auth } from '@/main/middlewares'

export default (router: Router): void => {
    router.post('/device', auth, adaptRoute(makeCreateDeviceController()))
    router.put('/device', auth, adaptRoute(makeUpdateDeviceController()))
    router.get('/device/:deviceIdentification', auth, adaptRoute(makeGetDeviceController()))
    router.get('/device/list/:deviceTenantId', auth, adaptRoute(makeListDeviceController()))
}
