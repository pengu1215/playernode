var express=require('express');

var mysql=require('mysql');
var path=require('path');
var fs=require('fs');

var router=express.Router();

var connection = mysql.createConnection({
   'host' : '127.0.0.1',
   'user' : 'user',
   'password' : 'password',
   'database' : 'player',
});

//router.get('/',function(request,response,next){
//    
//    response.json([
//        {
//            "program": 0,
//            "start" : "12:59",
//            "end" : "13:00"
//        }, 
//        {
//            "program": 1,
//            "start" : "13:00",
//            "end" : "13:01"
//        }
//        
//    ]);
//});

/* GET program list */
router.get('/program', function(request,response,next){
    connection.query('SELECT * FROM program WHERE site=songdo', function (error, rows) {
        
        if (error == null) {            
            //Success
            response.json(rows);
            
        } else {
            //Error
            response.sendStatus(503); //Server Error
        }
        
    });
});

/* GET schedule list */
router.get('/program', function(request,response,next){
    connection.query('SELECT * FROM schedule', function (error, rows) {
        
        if (error == null) {            
            //Success
            response.json(rows);
            
        } else {
            //Error
            response.sendStatus(503); //Server Error
        }
        
    });
});


module.exports=router;
