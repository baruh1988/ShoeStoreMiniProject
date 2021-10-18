const { request, response } = require('express');
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const isAuth = require('../middleware/apiAuth')
const Category = require('../models/category');

//http://localhost:6077/user/api/products/addCategory
router.post('/addCategory',isAuth,(request,response,next) => {

    const categoryName = request.body.categoryName;
    const categoryOrder = request.body.categoryOrder;
    const categoryImage = request.body.categoryImage;
    const categoryDescription = request.body.categoryDescription;
    const userFullName = request.account.firstName + ' ' + request.account.lastName;

    Category.create({
        categoryName : categoryName,
        categoryOrder : categoryOrder,
        categoryImage : categoryImage,
        categoryDescription : categoryDescription,
        accountName : userFullName
    })
    .then(category => {
        return response.status(200).json({
            process : true,
            data : category
        });
    }).catch(err => {
        return response.status(500).json({
            process : false,
            message : err.message
        });
    })

});

//http://localhost:6077/user/api/products/getProducts
router.get('/getAllCategories',isAuth,(request,response,next) => {

    Category.findAll()
    .then(data => {
        return response.status(200).json({
            process : true,
            data : data
        });
    })

});

module.exports = router;