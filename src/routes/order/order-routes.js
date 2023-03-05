const express = require("express");
const { sendOrder } = require("../../controllers/order/order-controller");
const auth = require("../../middleware/authJwt");


const routerOrder = express.Router();

//PARA CONFIRMAR LA ORDEN Y MANDAR EL EMAIL Y EL WAHTSAPP

routerOrder.post("/send-order", auth, sendOrder);


module.exports = routerOrder;