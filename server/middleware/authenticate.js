const jwt = require('jsonwebtoken')


const authenticate = (req,res,next) => {

    try {
        
        console.log(req)
        let cookieToken = req.cookies.token;
        console.log(req.cookies)
        //const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(cookieToken, process.env.SECRET_KEY);
        console.log(decode)
        req.userId = decode.Id
        req.userName = decode.Name
        req.role = decode.Role

        next()


    }catch(error)
    {
        res.redirect('/login')
    }
    
}

module.exports = authenticate