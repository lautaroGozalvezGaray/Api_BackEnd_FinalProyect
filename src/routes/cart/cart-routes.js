const express = require("express");
const { createNewCart, deleteCart, productsFromCart, addProductToCart, deleteProductFromCart, sendOrder } = require("../../controllers/cart/cart-controllers.js");
const auth = require("../../middleware/authJwt.js");

const routerCart = express.Router();

//CREAR UN CARRITO NUEVO

routerCart.post("/", auth , createNewCart);

//ELIMINAR UN CARRITO

routerCart.delete("/:id",auth , deleteCart)

//LISTAR TODOS LOS PRODUCTOS DEL CARRTIO SEGUN ID
routerCart.get("/:id/products",auth , productsFromCart)

//AGREGAR UN PRODUCTO MEDIANTE ID(TOMADO DEL BODY) AL CARRTIO MEDIANTE SU ID
routerCart.post("/:id/products",auth , addProductToCart);


//ELIMINAR UN PRODUCTO DEL CARRITO (ID) MEDIANTE EL ID DEL PRODUCTO


routerCart.delete("/:id/products/:id_prod",auth , deleteProductFromCart);


module.exports = routerCart;