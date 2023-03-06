const User = require("../../data_Persistence/daos/users/usersDaoMongoDb")
const bCrypt = require('bcrypt');
const generateToken = require("../../middleware/jsonWebToken");
const users = new User();
const logger = require("../../utils/Log4js");


function createHash(password) {
    return bCrypt.hashSync(
              password,
              bCrypt.genSaltSync(10),
              null);
}

const registerUser = async(req, res) =>{
    const {username, password} = req.body

    const allUsers = await users.getAll();
    let user = allUsers.find(u => u.username === username)    
    if (user) {
        logger.info('User already exists');
        return res.status(400).json({erro:"User already exists" })
    }

    const {name, adress, age, phone,email, avatar} = req.body;
    
    const newUser = {
        id: allUsers.length + 1,
        username: username,
        password: createHash(password),
        name: name,
        adress:adress,
        age: age,
        phone: phone,
        email: email,
        avatar:avatar
    }
    users.save(newUser);

    const usuario = {username, password}

    const access_token = generateToken(usuario)

    req.headers.authorization = access_token;

    res.json({ access_token })
}

const loginUser = async(req, res)=>{
    const {username, password } = req.body
    
    req.session.user = username;

    const allUsers = await users.getAll();
    let user = allUsers.find( user => user.username === username ) 

    if (!user) {
    return res.json({ error: 'credenciales invalidas' });
    }

    const usuario = {username, password}

    const access_token = generateToken(usuario)

    req.session.authorization = access_token;

    res.json({ access_token })
}

module.exports = {registerUser, loginUser};