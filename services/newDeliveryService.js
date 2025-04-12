
import moment from 'moment-timezone'
import config from '../config/config.js'
import BreakDownDatasource from '../datasource/breakDownDatasource.js'
import { BadreqError, NotFoundError } from '../errorHandlers/errors.js'
import VendorLogin from './vendorLoginService.js'
import DeliveryDatasource from '../datasource/deliveryDatasource.js'
import axios from 'axios'

const pickupTime = moment().add(1, 'day').startOf('day').add(10, 'hours').format('YYYY-MM-DD HH:mm:ss');
const deliveryTime = moment(pickupTime, 'YYYY-MM-DD HH:mm:ss').add(2, 'hours').format('YYYY-MM-DD HH:mm:ss');


class NewDeliveryService {
 
    async newDelivery(params){

      try {

        const getBreakdown = await new BreakDownDatasource().getBreakDown(params.uniqueKey)
        if(!getBreakdown) throw new NotFoundError('order breakdown not found')
      
        
        const accessToken = await new VendorLogin().login()
        params.pickupDetails[0].time = pickupTime
        params.dropOffDetails[0].time = deliveryTime

        params.dropOffDetails[0].has_return_task = false
        params.dropOffDetails[0].is_package_insured - 0
        params.dropOffDetails[0].hadVairablePayment = 1
        params.dropOffDetails[0].hadFixedPayment = 0
        params.dropOffDetails[0].is_task_otp_required = 0
        console.log(getBreakdown.ACTUAL_AMOUNT)
        
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
            "insurance_amount": getBreakdown.INSURANCE_AMOUNT,
            "total_no_of_tasks": 1,
            "total_service_charge": getBreakdown.TOTAL_SERVICE_CHARGE,
            "payment_method": 524288,
            "amount": getBreakdown.ACTUAL_AMOUNT,
            "surge_cost": getBreakdown.SURGE_PRICING,
            "surge_type": getBreakdown.SURGE_TYPE,
            "is_cod_job": 0,
            "cash_handling_charges": getBreakdown.CASH_HANDLING_CHARGE,
            "cash_handling_percentage": getBreakdown.CASH_HANDLING_PERCENTAGE,
            "net_processed_amount": getBreakdown.NET_CASH_PROCEEDS,
            "kwister_cash_handling_charge": getBreakdown.KWISTER_CASH_HANDLING_CHARGE,
            "delivery_charge_by_buyer": getBreakdown.delivery_charge_by_buyer,
            "delivery_charge": getBreakdown.DELIVERY_CHARGE,
            "collect_on_delivery": getBreakdown.COLLECT_ON_DELIVERY,
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