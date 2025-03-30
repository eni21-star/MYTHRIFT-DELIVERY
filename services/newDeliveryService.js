
import moment from 'moment-timezone'
import config from '../config/config.js'
import BreakDownDatasource from '../datasource/breakDownDatasource.js'
import { NotFoundError } from '../errorHandlers/errors.js'
import VendorLogin from './vendorLoginService.js'
import DeliveryDatasource from '../datasource/deliveryDatasource.js'
import axios from 'axios'

const pickupTime = moment().add(1, 'day').format('YYYY-MM-DD HH:mm:ss')
const deliveryTime = moment().add(2, 'day').format('YYYY-MM-DD HH:mm:ss');


class NewDeliveryService {

    async newDelivery(params){

      try {

        const getBreakdown = await new BreakDownDatasource().getBreakDown(params.orderId)
        if(!getBreakdown) throw new NotFoundError('order breakdown not found')
      
        
        const accessToken = await new VendorLogin().login()
        params.pickupDetails[0].time = pickupTime
        params.dropOffDetails[0].time = deliveryTime
        
        const data = {
            "domain_name": config.KWIK_DOMAIN_NAME,
            "access_token": accessToken,
            "vendor_id": config.KWIK_VENDOR_ID,
            "is_multiple_tasks": 1,
            "fleet_id": "",
            "latitude": 0,
            "longitude": 0,
            "timezone": 60,
            "has_pickup": 1,
            "has_delivery": 1,
            "pickup_delivery_relationship": 0,
            "layout_type": 0,
            "auto_assignment": 1,
            "team_id": "",
            "is_schedule_task": "1",
            "parcel_amount": 0,
            "pickups": params.pickupDetails,
            "deliveries": params.dropOffDetails,
            "insurance_amount": getBreakdown.additionalData.data.INSURANCE_AMOUNT,
            "total_no_of_tasks": 1,
            "total_service_charge": getBreakdown.additionalData.data.TOTAL_SERVICE_CHARGE,
            "payment_method": 524288,
            "amount": getBreakdown.additionalData.data.ACTUAL_AMOUNT,
            "surge_cost": getBreakdown.additionalData.data.SURGE_PRICING,
            "surge_type": getBreakdown.additionalData.data.SURGE_TYPE,
            "is_cod_job": 0,
            "cash_handling_charges": getBreakdown.additionalData.data.CASH_HANDLING_CHARGE,
            "cash_handling_percentage": getBreakdown.additionalData.data.CASH_HANDLING_PERCENTAGE,
            "net_processed_amount": getBreakdown.additionalData.data.NET_CASH_PROCEEDS,
            "kwister_cash_handling_charge": getBreakdown.additionalData.data.KWISTER_CASH_HANDLING_CHARGE,
            "delivery_charge_by_buyer": getBreakdown.additionalData.data.delivery_charge_by_buyer,
            "delivery_charge": getBreakdown.additionalData.data.DELIVERY_CHARGE,
            "collect_on_delivery": getBreakdown.additionalData.data.COLLECT_ON_DELIVERY,
            "delivery_instruction": params.deliveryInstructions,
            "loaders_amount": 0,
            "loaders_count": 0,
            "is_loader_required": 0,
            "delivery_images": "https://s3.ap-south-1.amazonaws.com/kwik-project/task_images/h9Qh1603888385149-stripeconnect.png",
            "vehicle_id": 0
          }
       
        const response = await axios.post(`${config.KWIK_URL}/v2/create_task_via_vendor`,data
        )
        if(response.data.status === 200){
            const resdata = response.data.data
            await new DeliveryDatasource().newDelivery({pickups: resdata.pickups, deliveries: resdata. deliveries, statusLink: resdata.job_status_check_link, cashback: resdata.cashback, uniqueOrderId: resdata.unique_order_id})
            return response.data
        }

      } catch (error) {
         throw error
      }

    }
}


export default NewDeliveryService