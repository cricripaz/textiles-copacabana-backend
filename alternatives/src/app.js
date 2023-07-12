import express from 'express'
import {pool} from "./db.js";

const app = express()

const PORT = 3000



app.get('/',(req, res) =>{
    res.send('Welcome Backend Textiles Copacabana')
})

app.get('/ping',async (req, res) =>{
   const [result] = await pool.query("SELECT * from users as RESULT");

   res.json(result);

})

app.listen(PORT)

console.log(`server on port ${PORT}`)

console.log(process.env.USERDB);
console.log(process.env.PASSWORD);