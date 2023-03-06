const express = require("express");
const routerChat = express.Router();
const passport = require('passport');
const loginUserChat = require("../../controllers/messages/messages-controllers");

//PARA RENDERIZAR EL CHAT
routerChat.get("/", (req, res) => {
    user= req.session.user
    console.log(user)
    if(user){
      res.render("./partials/chat.hbs", {user})
    }else{
      res.redirect('/api/chat/loginChat')
    }
})

//PARA LOGEARSE EN EL CHAT
routerChat.get('/loginChat', (req, res) => {
    res.render('./partials/login')
})

//REGISTA EL LOGIN

routerChat.post('/loginChat', loginUserChat)


//PARA LOGOUT
routerChat.get('/logoutChat', (req, res) => {
    req.session.destroy(err =>{
        if(err) return res.send(err)
        res.render('./partials/login')
    })
})

module.exports = routerChat;