
import axios from 'axios'
import config from '../config/config.js'
import VendorLogin from './vendorLoginService.js'


class CancelDeliveryService {

    async cancel(params){

        try {
            const accessToken = await new VendorLogin().login()
            const data = {
                "access_token": accessToken,
                "vendor_id": config.KWIK_VENDOR_ID,
                "job_id": params.jobId,
                "job_status": 9,
                "domain_name": "dev-client-panel.kwik.delivery"
              }
              console.log(data)
            const response = await axios.post(`${config.KWIK_URL}/cancel_vendor_task`, data)
            console.log(response.data)
            if(response.data.status == 200){
                console.log(response.data)
                return response.data
            }
        } catch (error) {
            throw error
        }
    }
}

export default CancelDeliveryService