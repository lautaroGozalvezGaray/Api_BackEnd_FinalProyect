const moment = require("moment");
const logger = require("../../utils/Log4js");

const CartDaoMongoDb = require("../../data_Persistence/daos/cart/cartDaoMongoDb");
const ProductsDaoMongoDb = require("../../data_Persistence/daos/products/productsDaoMongoDb");
const { sendMail } = require("../../utils/nodemailer");

const carrito = new CartDaoMongoDb();
const product = new ProductsDaoMongoDb();

const createNewCart = async(req, res) =>{
    try {
        user= req.session.user

        if(user){
            const {body} = req;

            body.user = user;
            body.timestamp = moment().format('MMMM Do YYYY, h:mm:ss a');
            body.products = [];

            const newCart = await carrito.save(body);
            console.log(newCart);
            newCart
                ? res.status(200).json({success : "cart added with ID: "+ newCart._id})
                : res.status(404).send(logger.error("There was an error creating the cart"));
        }else{
            res.status(404).json({messagge : "you need to login"})
            res.status(404).send(logger.error("you need to login"));
        }

        
    } catch (error) {
        return res.status(500).send(logger.error(`${error}`))
    }
}

const deleteCart = async(req, res) =>{
    try {

        user= req.session.user

        if(user){

            const {id} = req.params;

            await carrito.deleteById(id);

            res.status(200).json({mensaje: `Cart whit ID : ${id} was deleted successfully`});

            
        }else{
            res.status(404).json({messagge : "you need to login"})
            res.status(404).send(logger.error("you need to login"));
        }

    } catch (error) {
        return res.status(500).send(logger.error(`${error}`))
    }
}

const productsFromCart = async(req, res) =>{
    try {

        user= req.session.user

        if(user){
            const productsDb = null;
            const {id} = req.params;
            const cart = await carrito.getById(id);
            const productsInCart = cart.products;
            console.log(productsInCart)
            
            console.log(productsDb);
            
            cart 
            ? res.status(200).json({cart_number: id, "Products ": cart.products.length>0 ? cart.products : "There aren't products"})
            
            : res.status(404).send(logger.error(`The Cart whit ID: ${id} was not found`));
        }else{
            res.status(404).json({messagge : "you need to login"})
            res.status(404).send(logger.error("you need to login"));
        }

    } catch (error) {
        return res.status(500).send(logger.error(`${error}`))
    }
}

const addProductToCart = async(req, res) =>{
    try {

        user= req.session.user

        if(user){

            const {id}= req.params;
            const {body} = req;

            const carritoData = await carrito.getById(id);

            const existingProducts = carritoData.products;

            const newProducts = [...existingProducts, body];

            console.log(newProducts);

            if(newProducts){
                let productAdded = await carrito.updateById(id, { products: newProducts })
                console.log(productAdded);
                productAdded
                ? res.status(200).json({Success: "Product added"})
                : res.status(404).send(logger.error("there was a problem adding the product"))
        
            }else{
                res.status(404).send(logger.error("the product was not found"));
            }
            
        }else{
            res.status(404).json({messagge : "you need to login"})
            res.status(404).send(logger.error("you need to login"));
        }

    } catch (error) {
        return res.status(500).send(logger.error(`${error}`))
    }
}

const deleteProductFromCart = async(req, res) =>{
    try {

        user= req.session.user

        if(user){

            const {id} = req.params;
            const {id_prod} = req.params;
            let deleteProduct = await carrito.deleteProductFromCart(id, id_prod);
            deleteProduct
            ? res.status(200).json({Success: "Product succesfully deleted"})
            : res.status(404).send(logger.error("there was a problem deleting the product"))
                
        }else{
            res.status(404).json({messagge : "you need to login"})
            res.status(404).send(logger.error("you need to login"));
        }


    } catch (error) {
        return res.status(500).send(logger.error(`${error}`))
    }
}

module.exports= {createNewCart, deleteCart, productsFromCart, addProductToCart, deleteProductFromCart}