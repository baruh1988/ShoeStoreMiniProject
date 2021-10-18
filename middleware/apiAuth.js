const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = (request,response,next) => {

    const bearerHeader = request.headers['authorization'];
    if(bearerHeader){

        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];

        jwt.verify(bearerToken,'VyUcmnRvoF0R3Z2mjF3gRbXjQrrEW5as',(err,data) => {
            if(err){
                return response.sendStatus(403);
            }
            else{

                User.findOne({where:{email:data.dataToToken.email}})
                .then(user => {
                    request.account = user;
                    next();
                })
            }
        });

    }
    else{
        return response.sendStatus(403);
    }

}