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

    req.session.authorization = access_token;

    res.redirect('/api/chat')
}

const renderChat = async (req,res)=>{
    const user= req.session.user
    if(user){
      res.render("./partials/chat.hbs", {user})
    }else{
      res.redirect('/api/chat/loginChat')
    }
}

const logoutChat = async (req,res)=>{
    req.session.destroy(err =>{
        if(err) return res.send(err)
        res.render('./partials/login')
    })
}

module.exports ={loginUserChat, renderChat, logoutChat}