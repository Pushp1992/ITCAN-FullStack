var express = require('express'),
app = express(),
port = process.env.PORT || 3001,
mongoose = require('mongoose'),
Product = require('./api/models/productModel'), // getting schema from models
bodyParser = require('body-parser');


// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect = ('mongodb://localhost/productDb', { useNewUrlParser: true })


app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// app.use(function(req,res) {
    //     res.status(404).send({url: req.originalUrl +  ' not found' })
    // })
    
    app.get('/health-check', (req,res) => res.send('my health check verified successfully'))
    
var routes = require('./api/routes/producRoutes') // import routes
routes(app) // register the route
// app.use('/', routes)

app.listen(port)

console.log('app listening on PORT: ', port)