import jwt from 'jsonwebtoken'
import keymodel from '../models/apikey.js'


export const validateApiKey = async (req, res, next) => {
    try {
      
      const token = (req?.headers?.authorization?.startsWith('Bearer ') ? req.headers.authorization.substring(7) : null);
      if (!token) {
        return res.status(401).json({ message: 'Access denied. No API key provided.' });
      }
    
      const getApikeys = await keymodel.find().lean()
      if(!getApikeys[0].apiKey.includes(token)) return res.status(403).json({ message: 'Access denied. Invalid API key.' });
      next();
      
    } catch (error) {
      next(error)
    }
}

