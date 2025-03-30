import getBreakDownModel from "../models/breakDown.js"

class BreakDownDatasource {
    async newData(data){
        try {
               return await getBreakDownModel.create(data)
        } catch (error) {
            throw error
        }
    }

    async getBreakDown(orderId){
        console.log(orderId)
        return await getBreakDownModel.findOne({orderId})
    }
}

export default BreakDownDatasource