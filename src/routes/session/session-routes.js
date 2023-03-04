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
    req.session.destroy(err =>{
        if(err) return res.send(err)
        res.redirect('/api/session/login')
    })
})
module.exports=router;