const {Schema, model} = require("mongoose");

const messageSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
    },
    timestrap:{type: Date, default:Date.now},
})

module.exports = model("messages", messageSchema);