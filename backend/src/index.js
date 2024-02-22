const express = require('express');
const cors = require('cors');
const pool = require('./config/db.config');
const mainRouter = require("./routes/main.route");

const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());

//routes
app.use("/", mainRouter);

app.listen(3000, () => {
  console.log(`Server started at ${port}`);
})