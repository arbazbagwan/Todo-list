require("dotenv").config();
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(cors());

const CreateRoute = require("./routes/todo");
const User = require("./routes/user");
 

//DB Connection
mongoose
.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
  console.log("DB CONNECTED");
});

app.use("/api", CreateRoute);
app.use("/api", User);


app.listen(9000, ()=>{
    console.log("App running at port 9000");
});