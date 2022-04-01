const express = require("express");
const Transactions = require("../modules/transactions");
const router = express.Router();

const { application } = require("express");

//get a list of transactions
router.get("/transactions/", function (req, res, next) {
  // res.send({ type: "GET" });
  Transactions.find({}).then(function(transactions){
    res.send(transactions);
  })
});

//get a new transaction
router.post("/transactions", function (req, res, next) {
  // console.log(req.body);
  Transactions.create(req.body).then(function(transaction){
    res.send(transaction);
  }).catch(next);
  // res.send({ type: "POST", name: req.body.name, rank: req.body.rank })
});

//update database
router.put("/transactions/:id", function (req, res, next) {
  Transactions.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(transaction){
    //Find the updated information
    Transactions.findOne({_id: req.params.id}).then(function(transaction){
       //Send the updated information
        res.send(transaction);
    })
   
  });
  // res.send({ type: "PUT" });
});

//delete a transaction from database
router.delete("/transactions/:id", function (req, res, next) {
  // console.log(req.params.id)
  Transactions.findByIdAndRemove({_id: req.params.id}).then(function(transaction){
    res.send(transaction);
  });
  // res.send({ type: "DELETE" });
});

//Export routers
module.exports = router;
