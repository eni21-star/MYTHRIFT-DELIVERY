import mongoose from 'mongoose';

const TaskSubSchema = new mongoose.Schema({
  job_id: {
    type: Number,
    required: true
  },
  job_hash: {
    type: String,
    required: true
  },
  job_token: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    required: true
  },
  auto_assignment_data: {
    type: Number,
    required: true
  },
  order_id: {
    type: Number,
    required: true
  },
  result_tracking_link: {
    type: String,
    required: true
  },
  new_agent_task_insertion_data: {
    type: Array,
    default: []
  }
}, { _id: false });

const schema = new mongoose.Schema({
  pickups: {
    type: [TaskSubSchema],
    required: true
  },
  deliveries: {
    type: [TaskSubSchema],
    required: true
  },
  statusLink: {
    type: String
  },
  uniqueOrderId: {
    type: String
  },
  cashback: {
    type: Number
  }
}, { timestamps: true, versionKey: false });

const deliveryModel =  mongoose.model('deliveries', schema);

export default deliveryModel
