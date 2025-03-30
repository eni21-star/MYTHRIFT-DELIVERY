import mongoose from "mongoose";


const schema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    additionalData: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    }
},
{
    timestamps: true,
    versionKey: false
})

const getBreakDownModel = mongoose.model('deliveryBreakDown', schema)

export default getBreakDownModel