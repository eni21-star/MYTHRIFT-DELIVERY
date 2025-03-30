import deliveryModel from "../models/newDelivery.js"


class DeliveryDatasource {
    async newDelivery(data){
      await deliveryModel.create(data)
    }
}

export default DeliveryDatasource