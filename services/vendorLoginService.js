import axios from 'axios'
import config from '../config/config.js'

class VendorLogin {
        async login(){
            const response = await axios.post(`${config.KWIK_URL}/vendor_login`,
                {
                    "domain_name": config.KWIK_DOMAIN_NAME,
                    "email": "tobiwunmie@gmail.com",
                    "password": "Kwik2025$",
                    "api_login" :1
                }
             )

             console.log(response.data.data.access_token)
             return response.data.data.access_token

    }
}

export default VendorLogin