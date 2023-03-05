const express = require("express");
const logger = require("../../utils/Log4js");
const routerChat = express.Router();

//Para renderizar el chat
routerChat.get("/", (req, res) => {
    user= req.session.user
    
    res.render("./partials/chat.hbs", {user})

    /* if(user){
        res.render("./partials/chat.hbs", {user})
    }else{
        res.status(404).json({messagge : "you need to login"})
        res.status(404).send(logger.error("you need to login"));
    } */
    
})

module.exports = routerChat;