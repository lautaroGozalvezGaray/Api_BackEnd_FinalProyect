const express = require("express");
const routerChat = express.Router();
const {loginUserChat, renderChat, logoutChat} = require("../../controllers/messages/messages-controllers");

//PARA RENDERIZAR EL CHAT
routerChat.get("/", renderChat)

//PARA LOGEARSE EN EL CHAT
routerChat.get('/loginChat', (req, res) => {
    res.render('./partials/login')
})

//REGISTA EL LOGIN chat

routerChat.post('/loginChat', loginUserChat)


//PARA LOGOUT chat
routerChat.get('/logoutChat', logoutChat)

module.exports = routerChat;