const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();

// middleware
app.use(cors());
app.use(express.json());

//routes

// app.get('/', async (req, res) => {
//   try {
//     const todos = await pool.query("Select * from todo;");
//     res.json(todos);
//   } catch (error) {
    
//   }
// })

app.listen(3000, () => {
  console.log("Server starting at 3000");
})