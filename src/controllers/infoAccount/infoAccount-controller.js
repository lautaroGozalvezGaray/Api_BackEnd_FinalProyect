const logger = require("../../utils/Log4js");

const usersDaoMongoDb = require("../../data_Persistence/daos/users/usersDaoMongoDb");

const getInfoAccount = async(req, res) =>{
    try {
        let user = new usersDaoMongoDb();

        let userSession = req.session.user;

        const allUsers = await user.getAll();
        user = allUsers.find( user => user.username === userSession );

        res.status(200).json(UserDates= {user})


    } catch (error) {
        logger.error({error})
    }

}

module.exports = getInfoAccount;
