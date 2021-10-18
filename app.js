/////////////////////////////////////
//Import                           //
/////////////////////////////////////
const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./database/connection')

/////////////////////////////////////
//Create app                       //
/////////////////////////////////////
const app = express();

/////////////////////////////////////
//Use body-parcer                  //
/////////////////////////////////////
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

////////////////////////////////////////
//Import files from controllers folder//
////////////////////////////////////////
//http://localhost:6077/user/
const accountController = require('./controllers/accounts');
const productController = require('./controllers/products');
const orderController = require('./controllers/orders');

app.use('/api/accounts',accountController);
app.use('/api/products',productController);
//app.use('/api/orders',orderController);

/////////////////////////////////////
//Server listenner                 //
/////////////////////////////////////
const port = 6077;

connection.sync()
.then(result => {
    console.log(result);
    app.listen(port, function(){
        console.log(`Server is running via port ${port}`);
    });
})
.catch(err => {
    console.log(err);
});