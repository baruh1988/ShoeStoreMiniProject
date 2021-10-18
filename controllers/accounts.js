const { request, response } = require('express');
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

//create new account
//http://localhost:6077/api/accounts/register
router.post('/register',(request,response,next) => {
    //get data from request body
    const firstName = request.body.firstName;
    const lastName = request.body.lastName;
    const email = request.body.email;
    const password = request.body.password;

    //check if user exists in database
    User.findOne({where:{email:email}})
    .then(account => {
        if(account){
            return response.status(200).json({
                process: true,
                message: 'Email exists'
            });
        }
        else{
            //encrypt password
            bcryptjs.hash(password,10)
            .then(hashPass => {
                //store user in database
                const code = generateCode(1000,9999);
                //store user in database
                User.create({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: hashPass,
                    isConfirmed: false,
                    isLocked: false,
                    address: '',
                    city: '',
                    phone: '',
                    code: code
                })
                .then(newAccount => {
                    return response.status(200).json({
                        process: true,
                        message: 'Please check your mail to verify account',
                        data: newAccount,
                        code: code
                    });
                })
                .catch(saveToDbErr => {
                    return response.status(500).json({
                        process: false,
                        message: saveToDbErr
                    });
                });
            })
            .catch(hashErr => {
                return response.status(200).json({
                    process: false,
                    message: hashErr
                });
            });
        }
    }).catch(err => {
        return response.status(500).json({
            process: false,
            message: err
        });
    });
});

function generateCode(min,max){
    return Math.floor((Math.random() * max) + min);
}

//verify code
//http://localhost:6077/api/accounts/verifyCode
router.post('/verifyCode',(request,response,next) => {

    const code = request.body.code;
    const email = request.body.email;

    User.findOne({where:{email:email}})
    .then(account => {
        if(account){
            if(account.isConfirmed){
                return response.status(200).json({
                    process : false,
                    message : 'Account confirmed'
                });
            }
            else{
                //update account confirmed
                const existingCode = parseInt(account.code);
                const newCode = parseInt(code);

                if(existingCode === newCode){
                    account.isConfirmed = true;
                    account.save()
                    .then(accountUpdated => {
                        return response.status(200).json({
                            process : true,
                            message : accountUpdated
                        });
                    })
                }
                else{
                    return response.status(200).json({
                        process : false,
                        message : 'Wrong code'
                    });
                }
            }
        }
        else{
            return response.status(200).json({
                process : false,
                message : 'Account not found'
            });
        }
    });

});

//login
//http://localhost:6077/api/accounts/login
router.post('/login',(request,response,next) => {

    const email = request.body.email;
    const password = request.body.password;

    User.findOne({where:{email:email}})
    .then(account => {
        if(account){

            if(account.isConfirmed && !account.isLocked){

                bcryptjs.compare(password,account.password)
                .then(isMatch => {
                    if(isMatch){

                        const dataToToken = {
                            id : account.id,
                            email : account.email,
                            firstName : account.firstName,
                            lastName : account.lastName,
                            isConfirmed : account.isConfirmed,
                            address : account.address,
                            city : account.city,
                            phone : account.phone
                        }

                        jwt.sign({dataToToken},'VyUcmnRvoF0R3Z2mjF3gRbXjQrrEW5as',(err,token) => {
                            if(err){
                                return response.status(200).json({
                                    process : false,
                                    message : 'JWT out of service'
                                });
                            }
                            else{
                                return response.status(200).json({
                                    process : true,
                                    token : token
                                });
                            }
                        })
                        /*
                        return response.status(200).json({
                            process : true,
                            message : 'Login success'
                        });
                        */
                    }
                    else{
                        return response.status(200).json({
                            process : false,
                            message : 'Password no match'
                        });
                    }
                })

            }
            else{
                return response.status(200).json({
                    process : false,
                    message : 'Account was not confirmed or account is locked'
                });
            }

        }
        else{
            return response.status(200).json({
                process : false,
                message : 'Account not found'
            });
        }
    })
    .catch(error => {
        return response.status(500).json({
            process : false,
            message : error.message
        });
    })

});

module.exports = router;