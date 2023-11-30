const moment = require('moment')

const transactionModel = require('../models/transactionModel')



const getAlltransaction = async (req, res) => {
  try {
    const {frequency} = req.body
    const transactions = await transactionModel.find({
    date:{
      $gt: moment().subtract((Number(frequency)), 'd').toDate(),
    }, 
    userid: req.body.userid });

    console.log(req.body); // Log the request body for debugging
    console.log(transactions)
    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const addltransaction = async (req, res) => {
    try{
        const newTransaction = new transactionModel(req.body)

        await newTransaction.save();
        res.status(201).send('Transaction Created')

    }
    catch(error){
        res.status(500).json(error)
    }
}


module.exports = {getAlltransaction,addltransaction }