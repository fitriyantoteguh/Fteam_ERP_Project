var express = require('express');
var router = express.Router();

var con = require ('../class/connection');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/rooms', function(req, res, next) {
 con.query('SELECT * FROM tb_rooms', function (err, rows){
  if(err){
    res.send(err);
  }
  else  {
    res.send(rows);
  }
 })

});


router.post('/input', function(req, res) {
const{name, email}=req.body;

res.send({name, email});
 
 });

 


module.exports = router;
