var express = require('express');
var db = require('../db');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;


router.get('/api/ticket', function (req, res, next) {
    var query = req.query;
    console.log('ticket -> ' + JSON.stringify(query));

    var result = {};
    db.get().collection('tickets').find(query).toArray(function (err, records) {
        if (err) {
            console.error(err);
            return;
        } else {
            result.result = "ok";
            result.records = records;
            res.json(result);
        }
    });
});


router.post('/api/ticket', function (req, res, next) {
    var ticket = req.body;
    var result = {};
    if (ticket == undefined ) {
        result.result = "fail";
        result.message = "tickt is null";
    } else {
        ticket.state = "open";
        ticket.issuedate = new Date().toISOString();
        result.result = "ok";
        db.get().collection('tickets').insert(ticket, function(err) {
            if (err) {
                console.error(err);
                return;
            }
            result.id = ticket._id;
            res.json(result);
        });
    }
});


router.post('/api/register/event', function (req, res, next) {
    var record = req.body;
    var result = {};
    if (record == undefined ) {
        result.result = "fail";
        result.message = "record is null";
    } else {
        result.result = "ok";
        db.get().collection('technical_support_team_events').insert(record);
    }
    res.json(result);
});


router.post('/api/register/member', function (req, res, next) {
    var record = req.body;
    var result = {};
    if (record == undefined ) {
        result.result = "fail";
        result.message = "record is null";
    } else {
        result.result = "ok";
        db.get().collection('members').insert(record);
    }
    res.json(result);
});


router.post('/api/test', function (req, res, next) {
    var record = req.body;
    var result = JSON.parse('{  "SystemHeader" : {     "TMSG_WRTG_DT" : "20170314" ,      "INTF_ID"  : "IFTFOT0001"   } ,  "Data" : {    "ds_result1" : [      {"NAME":"test","AGE":41,"CHECK":"Y"}    ],    "ds_result2" : [      {"NAME":"test2","AGE":44444444,"CHECK":"Y"},      {"NAME":"test3","AGE":5555,"CHECK":"Y"},      {"NAME":"test4","AGE":21,"CHECK":"Y"},      {"NAME":"aaaaaaa","AGE":777777,"CHECK":"N"}    ]  }}');
    console.log(record);
    res.json(result);
});



router.get('/api/get/members', function (req, res, next) {
    var result = {};
    db.get().collection('members').find({}).toArray(function (err, records) {
        if (err) {
            result.result = "fail";
            result.message = err.message;
        } else {
            result.result = "ok";
            result.records = records;
            res.json(result);
        }
    });
});


module.exports = router;