import joi from 'joi'
import { ValidationErrror } from '../errorHandlers/errors.js'

const pickup = joi.object({
  address: joi.string().required().messages({
    'any.required': 'please provide pickup address'
  }),
  name: joi.string().required().messages({
    'any.required': 'please provide vendor name'
  }),
  latitude: joi.number().required().messages({
    'any.required': 'please provide the latitude'
  }),
  longitude: joi.number().required().messages({
    'any.required': 'please provide the longitude'
  }),
  phone: joi.string().required().messages({
    'any.required': 'please provide vendor phone number'
  }),
  email: joi.string().required().messages({
    'any.required': 'please provide vendor email'
  }),
})

const dropOffDetails = joi.object({
  address: joi.string().required().messages({
    'any.required': 'please provide drop-off address'
  }),
  name: joi.string().required().messages({
    'any.required': 'please provide recipient name'
  }),
  latitude: joi.number().required().messages({
    'any.required': 'please provide the latitude'
  }),
  longitude: joi.number().required().messages({
    'any.required': 'please provide the longitude'
  }),
  phone: joi.string().required().messages({
    'any.required': 'please provide recipient phone number'
  }),
})
const objectId = joi.string().pattern(/^[0-9a-fA-F]{24}$/).messages({
    'string.pattern.base': 'Invalid Firebase ID'
});
const validateCalculateDelivery = joi.object({
  pickupDetails: joi.array().items(pickup).required(),
  dropOffDetails: joi.array().items(dropOffDetails).required(),
  deliveryInstructions: joi.string(),
  orderId: objectId.required().messages({
    'any.required': 'please provide valid orderId',
    'string.pattern.base': 'Invalid  Id'
}),
})

export const validateCalculateDeliverySchema = (data) => {
  try {
    const { error, value } = validateCalculateDelivery.validate(data, { abortEarly: false })
    if (error) {
      throw new ValidationErrror(`Validation error: ${error.details.map(x => x.message).join(', ')}`)
    }
    return value
  } catch (error) {
    throw error
  }
}


const cancelDelivery = joi.object({
    jobId: joi.string().required().messages({
        'any.required': 'please provide job ids '
    })
})


export const validateCanceDelivery = (data) => {
    try {
      const { error, value } = cancelDelivery.validate(data, { abortEarly: false })
      if (error) {
        throw new ValidationErrror(`Validation error: ${error.details.map(x => x.message).join(', ')}`)
      }
      return value
    } catch (error) {
      throw error
    }
  }