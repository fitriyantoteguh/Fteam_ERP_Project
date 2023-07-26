let mysql = require('mysql');


 let connection = mysql.createConnection({
    host: 'localhost',
    port:3308,
    user :'antok',
    password:'Fyanto123#',
    database:'bb_db'
 });
connection.connect(function(error, args){
  if(!!error){
    console.log(error);
  }else{
    console.log(args);
  }
});

module.exports=connection;



