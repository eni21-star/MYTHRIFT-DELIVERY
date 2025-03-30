
import CalculatePricingService from "../services/calculateDeliveryService.js"
import CancelDeliveryService from "../services/cancelDeliveryService.js"
import NewDeliveryService from "../services/newDeliveryService.js"
import { validateCalculateDeliverySchema, validateCanceDelivery } from "../validations/validations.js"


export const calculatePricingController = async(req, res, next)=>{
   try {
    const data = req.body
    validateCalculateDeliverySchema(data)
    const response = await new CalculatePricingService().calculateDelivery(data)
    return res.status(201).json(response)
   } catch (error) {
    next(error)
   }
}

export const newDeliveryController = async( req, res, next)=>{
    try {
        const data = req.body
        validateCalculateDeliverySchema(data)
        const response = await new NewDeliveryService().newDelivery(data)

        return res.status(202).json(response)
    } catch (error) {
        next(error)
    }
}

export const cancelDeliveryController = async( req, res, next)=>{
    try {
        const data = req.body
        validateCanceDelivery(data)
        const response = await new CancelDeliveryService().cancel(data)

        return res.status(202).json(response)
    } catch (error) {
        next(error)
    }
}