const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const app = express();
app.use(cors());

//Connect to mongodb
mongoose.connect("mongodb://localhost/transactions");
mongoose.Promise = global.Promise;

app.use(bodyParser.json());

/*Set '/api'as the first parameter and import routes from api.js*/
app.use("/api", require("./router/api"));

//Middleware for error handling
app.use(function(err, req, res){
	console.log(err);
	/*422 - A requisição está bem formada mas inabilitada para ser seguida devido a erros semânticos. */
	res.status(422).send({error: err.message});
});

/*Listen for requests at the port 5001*/
app.listen(5001, function(){
	console.log("Listening for requests...");
});

app.get("/", function(req, res){
	console.log("Ready!");
	res.render("/", {qs: req.query});
	res.send({name: "Ready!"});
});