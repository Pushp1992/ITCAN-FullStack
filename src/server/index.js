var express = require('express'),
  app = express(),
  port = process.env.PORT || 3001,
  path = require('path'),
  mongoose = require('mongoose'),
  Product = require('./api/models/productModel'), //created model loading here
  bodyParser = require('body-parser');
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/ProductDb'); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/producRoutes'); //importing route
routes(app); //register the route

var proxyResolver = require('./proxy/resolver');
app.use('/proxy', proxyResolver);

// Static files
app.use(express.static(path.join(__dirname, "..", "..", "build")));

// Client app
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "..", "build", "index.html"));
});

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);