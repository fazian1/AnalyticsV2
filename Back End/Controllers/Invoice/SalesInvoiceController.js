//Taking the router for express to use the GET, POST, HTTP methods.

const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

//Importing the employee schema

var { SalesInvoice } = require ("../../Models/Invoice/SalesInvoice")

 //Now to use router.ger to use properties of the schema like find collection, get collection, etc

 //To use this get requeest we need to type localhost:3001/employees/, this is coming from index.js 
 //Where its mentioned /employees is the router

 router.get('/', (req, res) => {
     SalesInvoice.find((err, doc) => {
         if (!err) { res.send(doc); }
         else { console.log('Error in Retrieving SalesInvoice :' + JSON.stringify(err, undifines, 2)); }
     });

 });

 //Router for getting only approved addAccounts

 router.get('/approved', (req, res) => {
    SalesInvoice.find({ "status" : "1" },(err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retrieving SalesInvoice :' + JSON.stringify(err, undifines, 2)); }
    });

});

 //Making a route to get the values related to a specific id, keep in mind, this id is not the id a user gives
 //but an ID mongoDB sets its self for specific entries in the database.


 
 router.get("/:id", (req, res) => {
    const id = req.params.id;
    SalesInvoice.findById(id, (err, invoice) => {
      res.json(invoice);
    });
  });

 //Making a route to post the data with post rquest.

 //It should be noted that for now, we will be implementing

 router.post('/create', (req, res) => {
     var emp = new SalesInvoice({
      from:req.body.from,
      startDate:req.body.startDate,
      endDate: req.body.endDate,    
      reference: req.body.reference,
      accountName: req.body.accountName,
      accountType: req.body.accountType,
      total: req.body.total,
     });
     //Calling save function from mongoose, it will call back a function which will return a mongoDB object with above fields and properties
     //There will be another property called _id which will be used to fetch a particular data by mongoDB


     emp.save((err, doc) => {
         //Checking for error
         //if (!err) { res.send(doc);}
         //else {console.log('Error in Student Save :' + JSON.stringify(err, undefined, 2)); }
     });

 });


 //Building router for updating with router.put

 /*router.post('/:id', (req, res) => {
     if (!isValidObjectId(req.params.id))
        return res.status(400).send('No record with given id : ${req.param.id}');

    //Using an object to use the values of Employee and edit them, this object emp is different from Employee but uses its properties
    //emp object will be used to store the new values

    var emp = {
    
        name:req.body.name,
        addAccountstitle: req.body.addAccountstitle,
        addAccountscontent: req.body.addAccountscontent,
        status: req.body.status
       
    };
    //Calling Employee to find and upodate, mongoose property
    // (err,doc) is a call back function in mongoose that we need to show err or put, fetch anything from doc
    //{ new: true } is used to tell which data we wish to send, setting new: true, will send the updated data to the doc

    SalesInvoice.findByIdAndUpdate(req.params.id, { $set: emp}, { new: true }, (err, doc) =>{
        //Checking for errors
        //If error not found, sending response to the doc
        if(!err) {res.send(doc); }
        else { console.log('Error in SalesInvoice Update :' + JSON.stringify(err, undefined, 2)); }
    });



 });
*/
 router.post("/:id", (req, res) => {
    const id = req.params.id;
    SalesInvoice.findById(id, (err, invoice) => {
      if (!invoice) {
        res.status(404).send("invoice not found");
      } else {
        invoice.from = req.body.from;
        invoice.startDate = req.body.startDate;
        invoice.endDate = req.body.endDate;
        invoice.reference = req.body.reference;
        invoice.accountName = req.body.accountName,
        invoice.accountType = req.body.accountType,
        invoice.total = req.body.total
        invoice
          .save()
          .then((invoice) => {
            res.json(invoice);
          })
          .catch((err) => res.status(500).send(err.message));
      }
    });
  });

 //Building a delete router for delete request. The delete request is called through req,res function


 router.delete("/delete/:id", (req, res) => {
  var id = ObjectId(req.params.id)
  SalesInvoice.findByIdAndRemove(id,(err, doc) => {
      if (!err) { res.send(doc); }
      else { console.log('Error in Retrieving SalesInvoice :' + JSON.stringify(err, undifines, 2)); }
  });

});


module.exports = router;


 //We have to configure these routes in the root file which is index.js


