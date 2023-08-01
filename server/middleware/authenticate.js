const jwt = require('jsonwebtoken')


const authenticate = (req,res,next) => {
    try {
        let cookieToken = req.cookies.token;
        //const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(cookieToken, process.env.SECRET_KEY);
        req.userId = decode.Id
        req.userName = decode.Name
        req.role = decode.Role
        next()
    }catch(error)
    {
        res.status(403).json({
          message : "user is not authorized "
        })
        
    }
}

module.exports = authenticate