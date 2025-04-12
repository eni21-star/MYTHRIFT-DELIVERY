import mongoose from "mongoose";
import { Schema } from "mongoose";


const schema = new mongoose.Schema({
    uniqueKey: {
        type: String,
        required: true,
        unique: true
    },

    ACTUAL_AMOUNT: { type: String },
    DISCOUNT: { type: String },
    CREDITS_TO_ADD: { type: Number },
    VAT: { type: Number },
    PENDING_AMOUNT: { type: Number },
    SERVICE_TAX: { type: Number },
    BENEFIT_TYPE: { type: Schema.Types.Mixed, default: null },
    PAYABLE_AMOUNT_WITHOUT_CREDITS: { type: Number },
    TIP: { type: String },
    DEFAULT_VAT_PERCENT: { type: Number },
    DEFAULT_SERVICE_TAX_PERCENT: { type: Number },
    INSURANCE_AMOUNT: { type: Number },
    AMOUNT_PER_TASK: { type: String },
    TOTAL_NO_OF_TASKS: { type: Number },
    AMOUNT_FOR_FIRST_TASK: { type: String },
    TOTAL_SERVICE_CHARGE: { type: Number },
    SURGE_PRICING: { type: Number },
    SURGE_TYPE: { type: Number },
    CREDITS_USED: { type: String },
    LOADER_CHARGES: { type: Number },
    LOADER_REQUIRED: { type: Number },
    LOADERS_INSTRUCTION: { type: String },
    LOADERS_IMAGES: { type: String },
    VEHICLE_ID: { type: Number },
    PENDING_CANCELLATION_CHARGE: { type: Number },
    PENDING_WAITING_CHARGES: { type: Number },
    LOADERS_COUNT: { type: Number },
    SAREA_ID: { type: Number },
    CURRENT_CREDITS: { type: String },
    PROMO_VALUE: { type: Schema.Types.Mixed },
    DISCOUNTED_AMOUNT: { type: String },
    PAYABLE_AMOUNT: { type: String },
    NET_PAYABLE_AMOUNT: { type: Number },
    ORDER_PAYABLE_AMOUNT: { type: Number },
    ACTUAL_ORDER_PAYABLE_AMOUNT: { type: Number },
    VENDOR_CREDITS: { type: Number },
    NET_CREDITS_PAYABLE_AMOUNT: { type: Number },
    WALLET_ENABLE: { type: Number },
    delivery_charge_by_buyer: { type: Number },
    COLLECT_ON_DELIVERY: { type: Schema.Types.Mixed },
    CASH_HANDLING_PERCENTAGE: { type: Number },
    CASH_HANDLING_CHARGE: { type: Number },
    KWISTER_CASH_HANDLING_CHARGE: { type: String },
    NET_CASH_PROCEEDS: { type: Schema.Types.Mixed },
    DELIVERY_CHARGE: { type: Number },
  },

{
    timestamps: true,
    versionKey: false
})

const getBreakDownModel = mongoose.model('deliveryBreakDown', schema)

export default getBreakDownModel