const jwt = require("jsonwebtoken")

function auth(req, res, next) {

  const authHeader = req.session.authorization;

  console.log(authHeader)

  if (!authHeader) {
    return res.status(401).json({
      error: 'not authenticated'
    });
  }
  
  const token = authHeader

  const PRIVATE_KEY = process.env.PRIVATE_KEY;
  
  jwt.verify(token, PRIVATE_KEY, (err, decoded) => {
    console.log(err)
    if (err) {
      return res.status(403).json({
        error: 'not authorized'
      });
    }
    console.log(decoded.data)
    req.user = decoded.data;
    next();
  });
};

function authChat(req, res, next) {

  const authHeader = req.session.authorization;

  console.log(authHeader)

  if (!authHeader) {
    return res.render("../views/partials/errorLogin.hbs")
  }
  
  const token = authHeader

  const PRIVATE_KEY = process.env.PRIVATE_KEY;
  
  jwt.verify(token, PRIVATE_KEY, (err, decoded) => {
    console.log(err)
    if (err) {
      return res.render("../views/partials/errorLogin.hbs")

    }
    console.log(decoded.data)
    req.user = decoded.data;
    next();
  });
};
   

module.exports = {auth, authChat};