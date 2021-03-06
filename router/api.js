const express = require("express");
const Transactions = require("../modules/transactions");
const router = express.Router();

const { application } = require("express");

router.get("/transactions/", function (req, res, next) {
  let query = {...req.query};
  //Set description to lowercase
  if (req.query.description){
    req.query.description = req.query.description.toLocaleLowerCase();
  }
  console.log(req.query);
  Transactions.find(query).then(function (transactions) {
    res.send(transactions);
  });
});
 
 
//get a new transaction
router.post("/transactions", function (req, res, next) {
  Transactions.create(req.body)
    .then(function (transaction) {
      res.send(transaction);
    })
    .catch(next);
});

//update database
router.put("/transactions/:id", function (req, res, next) {
  Transactions.findByIdAndUpdate({ _id: req.params.id }, req.body).then(
    function (transaction) {
      //Find the updated information
      Transactions.findOne({ _id: req.params.id }).then(function (transaction) {
        //Send the updated information
        res.send(transaction);
      });
    }
  );
});

//delete a transaction from database
router.delete("/transactions/:id", function (req, res, next) {
  Transactions.findByIdAndRemove({ _id: req.params.id }).then(function (
    transaction
  ) {
    res.send(transaction);
  });
});

//Export routers
module.exports = router;
