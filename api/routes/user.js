const express = require('express');
const router = express.Router();

const mysqlConnection = require('../connection/connection');


const jwt = require('jsonwebtoken')

router.get('/', (req,res)=>{
    mysqlConnection.query('select * from users', (err,rows,fields) => {
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    })
});


router.post('/singin',(req, res)=>{

    const {username ,password } =req.body;

    mysqlConnection.query('SELECT username,role_id FROM users WHERE username=? and password=?', [username,password],
        (err, rows , fields) =>{
            if(!err){
                if(rows.length > 0){
                    let data = JSON.stringify(rows[0])
                   const token = jwt.sign(data,'melo');
                    res.json({token})
                }else {
                    //TODO research status codes for correct line
                    res.status(401).json({error : 'user or pass incorrect'});
                }
            }else{
                console.log(err);
            }
        })

})


router.post('/test',verifyToken,(req, res)=>{

    console.log(req.data);

    res.json('informacion secreta')

})


function verifyToken(req,res,next){

    if (!req.headers.authorization) return res.status(401).json('No Autorizado');

   const token =  req.headers.authorization.substring(7);

   if(token !== ''){
       //TODO change secret word to .env VARIABLE
       req.data = jwt.verify(token, 'melo');
       next();
   }else{
       res.status(401).json({message : 'Token Vacio'})
   }

}

module.exports = router;