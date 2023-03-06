const express = require("express");
const getInfoAccount = require("../../controllers/infoAccount/infoAccount-controller");
const {auth} = require("../../middleware/authJwt");

const routerinfoAccount = express.Router();

//MUESTRA TODA LA INFORMACION DEL USUARIO DE LA CUENTA
routerinfoAccount.get("/infoAccount",auth, getInfoAccount)


module.exports = routerinfoAccount;