const express = require('express');
const cors = require('cors');
const path = require('path');
const pool = require('./config/dbConfig');
const customerRouter = require("./routes/customerRoute");

const app = express();
const port = process.env.PORT || 3000;

if(process.env.NODE_ENV === 'production') {
  // serve static content
  app.use(express.static())
}

// middleware
app.use(cors());
app.use(express.json(path.join(__dirname, 'frontend/build')));

//routes
app.use("/customer", customerRouter);

app.listen(3000, () => {
  console.log(`Server started at ${port}`);
})