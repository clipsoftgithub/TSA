var express = require('express');
var db = require('../db');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;


router.get('/', function (req, res, next) {
    var id = req.query['id'];
    console.log(id);
    db.get().collection('tickets').find({_id: new ObjectID(id)}).limit(1).toArray(function (err, records) {
        if (err) {
            console.error(err.message);
        } else {
            res.render('assign-task', {ticket : records[0]});
        }
    });

});

module.exports = router;
