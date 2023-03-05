const {Router} = require("express");
const passport = require('passport');
const { authMiddleware } = require("../../middleware/authMiddleware");

const router = Router();


//____________________________________________ login _____________________________________ //

router.post('/login', passport.authenticate('login',{ 
    failureRedirect: '',}),
    (req, res) => {
    const {username} = req.body
    req.session.user = username;
    res.status(200).json(message = `Sesion iniciada. Bienvenido ${username}`)
})

//____________________________________________ register _____________________________________ //

router.post('/register', passport.authenticate('signup', {}), 
    (req, res)=>{
        res.status(200).json(req.body)
    }
)
//____________________________________________ logout _____________________________________ //

router.get('/logout', (req, res) => {
    user = req.session.user
    req.session.destroy(err =>{
        if(err) return  res.status(400).json(message = `Error al cerrar sesion`)
        res.status(200).json(message = `Hasta luego ${user}. Vuelvas Prontos`)
    })
})
module.exports=router;