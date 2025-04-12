import axios from "axios"
import config from "../config/config.js"
import VendorLogin from "./vendorLoginService.js"
import moment from 'moment-timezone'
import { parentPort } from "worker_threads"
import BreakDownDatasource from "../datasource/breakDownDatasource.js"

const pickupTime = moment().add(1, 'day').startOf('day').add(10, 'hours').format('YYYY-MM-DD HH:mm:ss');
const deliveryTime = moment(pickupTime, 'YYYY-MM-DD HH:mm:ss').add(2, 'hours').format('YYYY-MM-DD HH:mm:ss');



class CalculatePricingService {

   async calculateDelivery(params){
        try {
          
          params.pickupDetails[0].time = pickupTime
          params.dropOffDetails[0].time = deliveryTime
      
          
      
          const accessToken = await new VendorLogin().login()
          const data = {
              "custom_field_template": "pricing-template",
              "access_token": accessToken,
              "domain_name": "staging-client-panel.kwik.delivery",
              "timezone": 60,
              "vendor_id": 3506,
              "is_multiple_tasks": 1,
              "layout_type": 0,
              "pickup_custom_field_template": "pricing-template",
              "deliveries": params.dropOffDetails,
              "has_pickup": 1,
              "has_delivery": 1,
              "auto_assignment": 1,
              "user_id": 1,
              "pickups": params.pickupDetails,
              "payment_method": 32, 
              "form_id": 2,
              "vehicle_id": 0, 
              "delivery_instruction": params.deliveryInstructions,
              "delivery_images": 0,
              "is_loader_required": 0,
              "loaders_amount": 0,
              "loaders_count": 0,
              "is_cod_job": 0,
              "parcel_amount": 0
            }
      
          const response = await axios.post(`${config.KWIK_URL}/send_payment_for_task`, data,
              {
                  headers: {
                      "Content-Type": "application/json"
                  }
              }
          )
      
              if(response.data.status==200){
                const newData = { status: response.data.status, message: response.data.message, cost: response.data.data.per_task_cost, pickups: response.data.data.pickups, delivery: response.data.data.deliveries  }
                return getBill({uniqueKey: params.uniqueKey, accessToken, amount: response.data.data.per_task_cost, pickupTime, total_service_charge:response.data.data.total_service_charge })
              }


        } catch (error) {
            throw error
        }
    }
}


export default CalculatePricingService


async function getBill(params){

    try {

      const data = {
        "access_token": params.accessToken,
        "benefit_type": null,
        "amount": params.amount,
        "insurance_amount": 0,
        "total_no_of_tasks": 1,
        "pickup_time": params.pickupTime,
        "user_id": 1,
        "form_id": 2,
        "promo_value": null,
        "domain_name": config.KWIK_DOMAIN_NAME,
        "credits": 0,
        "total_service_charge": params.total_service_charge,
        "vehicle_id": 0,
        "delivery_images": "https://s3.ap-south-1.amazonaws.com/kwik-project/task_images/wPqj1603886372690-stripeconnect.png",
        "is_loader_required": 0,
        "loaders_amount": 0,
        "loaders_count": 0,
        "is_cod_job": 0,
        "parcel_amount": 0,
        "delivery_charge_by_buyer": 2,
        "delivery_instruction": "Hey,Please handover parcel with safety.\nThanks"
      }
      const response = await axios.post(`${config.KWIK_URL}/get_bill_breakdown`, data, {
        headers: {
          "Content-Type": "application/json"
        }
      } )
  
      const newData = {uniqueKey: params.uniqueKey, ...response.data.data}
      const create = await new BreakDownDatasource().newData(newData)
      return response.data
      
    } catch (error) {
      throw error
    }

}
