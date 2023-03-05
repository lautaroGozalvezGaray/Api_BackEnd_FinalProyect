const CartDaoMongoDb = require("../../data_Persistence/daos/cart/cartDaoMongoDb");
const OrdersDaoMongoDb = require("../../data_Persistence/daos/order/ordersDaoMongoDd");
const UsersDaoMongoDb = require("../../data_Persistence/daos/users/usersDaoMongoDb");
const logger = require("../../utils/Log4js");
const {sendEmail} = require("../../utils/nodemailer")

const carrito = new CartDaoMongoDb();
const order = new OrdersDaoMongoDb();
const user = new UsersDaoMongoDb();

const sendOrder = async(req, res) =>{

    const userSession = req.session.user

    if(userSession){

        //traigo el user
        const allUsers = await user.getAll();
        let userDates = allUsers.find( user => user.username === userSession ) 

        //traigo el carrito de user
        const cart = await carrito.getByUsername(userSession);

        if(cart.products.length>0){

            const productsInCart = cart.products;

            const orderNumber = Math.floor(Math.random() * 1000000000) + 10000;;

            let total;

            const status = "Generada"

            for (const prod in productsInCart) {
                total =+ prod.price;
            }

            const generateOrder = {
                items: productsInCart,
                orderNumber: orderNumber,
                status: status,
                email: userDates.email
            }

            console.log(generateOrder)

            order.save(generateOrder);
            
            sendEmail(generateOrder);

            const idCart = cart.id;

            await carrito.deleteById(idCart)

            res.status(200).json({
                message : "Order sent successfully",
                order: generateOrder
            })

        }else{
            res.status(404).json({messagge : "no products added to cart"})
        }
    }else{
        res.status(404).json({messagge : "you need to login"})
        res.status(404).send(logger.error("you need to login"));
    }

}

module.exports= {sendOrder}