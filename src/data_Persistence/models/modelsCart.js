const {Schema, model} = require("mongoose");

const cartsSchema = new Schema({
    user:{
        type: String
    },
    timestrap:{type: Date, default:Date.now},
    products:[
        {
            type: Object
        }
    ]
})

module.exports = model("carts", cartsSchema);