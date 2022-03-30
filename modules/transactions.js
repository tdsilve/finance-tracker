const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema & model
const transactionSchema = new Schema({
  type:{
    type: String,
    required: [true, 'Type field required']
  },
  category:{
    type: String,
    required: [true, 'Category field required']
  },
  description:{
    type: String,
    required: [true, 'Description field required']
  },
  value:{
    type: Number,
    required: [true, 'Number field required']
  }

});

const Transactions = mongoose.model('transactions', transactionSchema);

module.exports = Transactions;
