var express = require('express');
var db = require('../db');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;

//
// 티켓
//
router.get('/api/ticket', function (req, res, next) {
    var query = req.query;
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
        result.message = "ticket is null";
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


//
// 작업
//
router.get('/api/task', function (req, res, next) {
    var query = req.query;
    var result = {};
    db.get().collection('tasks').find(query).toArray(function (err, records) {
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


router.post('/api/task', function (req, res, next) {
    var task = req.body;
    var result = {};
    if (task == undefined ) {
        result.result = "fail";
        result.message = "task is null";
    } else {
        task.state = "open";
        task.issuedate = new Date().toISOString();
        result.result = "ok";
        db.get().collection('tasks').insert(task, function(err) {
            if (err) {
                console.error(err);
                return;
            }
            result.id = task._id;
            res.json(result);
        });
    }
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