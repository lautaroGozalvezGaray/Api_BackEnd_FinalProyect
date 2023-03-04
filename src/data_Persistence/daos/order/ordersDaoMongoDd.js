const MongoDbContainer = require("../../../data_Persistence/container/mongoDbContainer.js");
const Order = require("../../../data_Persistence/models/modelsOrders");

module.exports = class ProductsDaoMongoDb extends MongoDbContainer{
    constructor(){
        super(Order)
    }
}