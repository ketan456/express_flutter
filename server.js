const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConections");
const dotenv = require("dotenv").config();


connectDb();
const app = express();

const port = process.env.PORT || 3000;

//app.use(express.json()); this func is needed for get json body
app.use(express.json());
app.use("/",(req,res)=>[
    res.send({message:"all good"})
]);
app.use("/api/contacts",require("./routes/contactRoutes"));
app.use("/api/users",require("./routes/userRoutes"))

app.use(errorHandler)

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});