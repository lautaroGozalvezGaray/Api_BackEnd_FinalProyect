const express = require("express");
const { productsGet, productsGetById, addProducts, deleteProducts, updateProducts, getProductByCategory } = require("../../controllers/products/products-controllers.js");
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

//PARA BUSCAR PRODUCTOS POR CATEGORIA

routerProducts.get("/categoria/:cat", auth, getProductByCategory);

module.exports=routerProducts;
