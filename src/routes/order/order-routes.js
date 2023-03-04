const express = require("express");
const { sendOrder } = require("../../controllers/order/order-controller");


const routerOrder = express.Router();

//PARA CONFIRMAR LA ORDEN Y MANDAR EL EMAIL Y EL WAHTSAPP

routerOrder.post("/send-order", sendOrder);


module.exports = routerOrder;