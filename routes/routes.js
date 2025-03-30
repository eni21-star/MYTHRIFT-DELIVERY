import express from 'express'
import { calculatePricingController, cancelDeliveryController, newDeliveryController } from '../controllers/controllers.js'
const router = express.Router()

router.post('/calculateDelivery', calculatePricingController)


router.post('/newDelivery', newDeliveryController)

router.post('/cancelDelivery', cancelDeliveryController)

export default router