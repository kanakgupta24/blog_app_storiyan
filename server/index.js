import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';


import Connection from './database/db.js';

import router from './routes/route.js';

dotenv.config();

const app=express();

app.use(cors());
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/',router);
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });

const PORT=8000;

app.listen(PORT, ()=>console.log(`Server is running successfully on port ${PORT}`));


const username=process.env.DB_USERNAME;
const password=process.env.DB_PASSWORD;


Connection(username,password);
