const express = require("express");
const { productsGet, productsGetById, addProducts, deleteProducts, updateProducts } = require("../../controllers/products/products-controllers.js");
const {auth} = require("../../middleware/authJwt.js");


const routerProducts = express.Router();


//TRAER TODOS LOS PRODUCTOS

routerProducts.get("/",auth, productsGet);

//TRAER UN PRODUCTO MEDIANTE ID
routerProducts.get("/:id",auth, productsGetById);


//AGREGAR UN PRODUCTO
routerProducts.post("/",auth, addProducts);

//ELIMINAR UN PRODUCTO
routerProducts.delete("/:id",auth, deleteProducts)

//MODIFICAR UN PRODUCTO
routerProducts.put("/:id", auth, updateProducts);

module.exports=routerProducts;
