import express from 'express'
import { calculatePricingController, cancelDeliveryController, newDeliveryController } from '../controllers/controllers.js'
import { validateApiKey } from '../middleware/verifyKey.js'
const router = express.Router()

router.post('/calculateDelivery', validateApiKey, calculatePricingController)


router.post('/newDelivery', validateApiKey,  newDeliveryController)

router.post('/cancelDelivery',validateApiKey, cancelDeliveryController)

export default router