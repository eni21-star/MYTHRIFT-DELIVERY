import dotenv from 'dotenv'
dotenv.config()

const config = {
    PORT: process.env.PORT ?  process.env.PORT : 3000,
    mongoUrl: process.env.MONGOURL ? process.env.MONGOURL : "mongodb://localhost:27017/MYTHRIFT-DELIVERIES",
    KWIK_URL: process.env.KWIK_URL,
    KWIK_DOMAIN_NAME: process.env.KWIK_DOMAIN_NAME,
    KWIK_VENDOR_ID: process.env.KWIK_VENDOR_ID
}

export default config