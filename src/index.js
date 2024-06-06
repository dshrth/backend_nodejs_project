import dotenv from "dotenv";
import express from 'express';
import cors from 'cors';
import connectDB from './db/index.js';

dotenv.config({
   path: './env'
})

 const app = express();
 const port = process.env.port || 3000;   
 app.use(cors());

connectDB();

 let user = [
    { "name": "Arjun Tripathi", "email": "d1@gmail.com", "password": "123456", "gender": "m", "id": "1"},
    { "name": "Rahul Durgapal", "email": "d2@gmail.com", "password": "12345", "gender": "m", "id": "2" },
    { "name": "priti", "email": "d3@gmail.com", "password": "1234", "gender": "f", "id": "3"}
];

app.get('/', (req, res) => {
    res.send('Hello');
 })
app.get('/user', (req, res) => {
   res.status(200).json(user);
})

app.listen(port, () => {
     console.log(`Example app listening at http://localhost:${port}`)
 })