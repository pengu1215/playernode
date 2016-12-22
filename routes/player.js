/**
 * Songdo Server API
 */

var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var connection = mysql.createConnection({
	
	
    'host' : '127.0.0.1',
    'user' : 'user',
    'password' : 'password',
    'database' : 'player'
    
    	
});

var site = 'test';

router.get('/', function (req, res, next) {
	res.redirect('/player/list');
});

router.get('/list', function(req, res, next){
	connection.query('SELECT schedule.idx, name, path, start, end FROM schedule INNER JOIN program ON program.idx = schedule.program_idx WHERE site=? ORDER BY schedule.idx', site, function(err, rows) {

		if (!err) {
			res.render('list', {rows: rows});
		} else {
			res.sendStatus(503); 
		}

	});
	
});

/* GET program list */
router.get('/program', function(req, res, next) {
	connection.query('SELECT idx, name, path FROM program WHERE site=?', site, function(err, rows) {

		if (!err) {
			res.json(rows);
		} else {
			res.sendStatus(503); 
		}

	});
});

/* GET schedule list */
router.get('/schedule',function(req, res, next) {
	connection.query('SELECT schedule.idx, name, path, start, end FROM schedule INNER JOIN program ON program.idx = schedule.program_idx WHERE site=? ORDER BY schedule.idx', site, function(err, rows) {

		if (!err) {
			res.json(rows);
		} else {
			res.sendStatus(503); 
		}

	});
});

router.post('/upload', function(req, res, next) {
//	connection.query('TRUNCATE TABLE schedule', function(err, rows) {
	connection.query('DELETE FROM schedule INNER JOIN program ON program.idx = schedule.program_idx WHERE site=?', site, function(err, rows) {
		
		if (!err) {
			res.json(rows);
		} else {
			res.sendStatus(503); 
		}
	});
});

module.exports = router;