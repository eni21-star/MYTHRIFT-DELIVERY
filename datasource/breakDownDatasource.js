import getBreakDownModel from "../models/breakDown.js"

class BreakDownDatasource {
    async newData(data){
        try {
               return await getBreakDownModel.create(data)
        } catch (error) {
            throw error
        }
    }

    async getBreakDown(key){
      
        return await getBreakDownModel.findOne({uniqueKey: key })
    }
}

export default BreakDownDatasource