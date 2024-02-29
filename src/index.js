const express = require('express');
const cors = require('cors');
const pool = require('./config/dbConfig');
const customerRouter = require("./routes/customerRoute");

const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());

//routes
app.use("/customer", customerRouter);

app.listen(3000, () => {
  console.log(`Server started at ${port}`);
})