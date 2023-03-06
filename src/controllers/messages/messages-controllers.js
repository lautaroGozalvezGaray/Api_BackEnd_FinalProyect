const User = require("../../data_Persistence/daos/users/usersDaoMongoDb")
const generateToken = require("../../middleware/jsonWebToken");
const bCrypt = require('bcrypt');
const users = new User();


function isValidPassword(user, password) {
    return bCrypt.compareSync(password, user.password);
}

const loginUserChat = async(req, res)=>{
    const {username, password } = req.body
    
    req.session.user = username;

    const allUsers = await users.getAll();
    let user = allUsers.find( user => user.username === username) 

    if (!user) {
        return res.render("../views/partials/errorLogin.hbs")
    }

    if (!isValidPassword(user, password)) {
        return res.render("../views/partials/errorLogin.hbs")
     }

    const usuario = {username, password}

    const access_token = generateToken(usuario)

    console.log(access_token)

    req.session.authorization = access_token;

    res.redirect('/api/chat')
}

module.exports = loginUserChat