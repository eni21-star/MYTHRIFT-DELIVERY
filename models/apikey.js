
import mongoose, { mongo } from "mongoose";


const schema = new mongoose.Schema({
    apiKeys: {
        type: mongoose.Schema.Types.Array,
        required: true
    }
},
{
    timestamps: true,
    versionKey: false
})


const keymodel =  mongoose.model("apiKey", schema)


export default keymodel