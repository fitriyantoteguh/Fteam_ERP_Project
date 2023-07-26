var express = require('express');
var router = express.Router();
const EventEmitter = require('node:events');
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();
var con = require ('../class/connection');



router.get('/', function (req, res)
{
    con.query('SELECT * FROM tb_rooms', function(err, rows){
        if  (err){
            res.send(err);
        }
        else{
            res.send(JSON.stringify(rows))
        }
    });
  
    // myEmitter.on('event', (a, b) => {

    //     res.render(a)
    //   });


});

router.post('/input_room', function (req, res){
    const{room_number, room_cat, id_user}=req.body;
    var post={"room_number":room_number, "room_cat":room_cat, "id_user":id_user};
    con.query("INSERT INTO tb_rooms SET ?",post, function(err, result){
        if (err){
            res.send({message:'failure'});
           
            
       }
       if (result){
        res.send({message:'success'});
        myEmitter.emit('event', room_number, room_cat);   }
    });

});
router.put('/update_room',  function (req, res){
    const{id_room,room_number, room_cat, id_user}=req.body;
    var post={"room_number":room_number, "room_cat":room_cat, "id_user":id_user};
     con.query("UPDATE tb_rooms SET ? WHERE id_room = ?",[post, id_room], function(err, result){
        if (err){
            res.send({message:'failure'});
            console.log(err);
       }
       if (result){
        res.send({message:'success'});
        console.log(result);
   }
    
    }); 
 });

router.put('/disable_room', function(req, res){
    const {id_room, status}=req.body;
    var update={"status_room":status}
    con.query("UPDATE tb_rooms SET ? WHERE id_room = ?",[update, id_room], function(err, result){
        if (err){
            res.send({message:'failure'});
            console.log(err);
       }
       if (result){
        res.send({message:'success'});
        console.log(result);
   }
    })
});

 router.delete('/del_room',  function (req, res){
    const{id_room}=req.body;
     con.query("DELETE FROM tb_rooms WHERE id_room = ?",[id_room], function(err, result){
        if (err){
            res.send({message:'failure'});
            console.log(err);
       }
       if (result){
        res.send({message:'success'});
        console.log(result);
   }
    
    }); 
 });


module.exports = router;
