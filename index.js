const express = require("express");
// const { connection } = require("../Backend/db");
const { UserRouter } = require("./routes/user.routes");
const { doctorRouter } = require("./routes/doctor.routes")
require("dotenv").config();
const cors = require("cors");
const { connection } = require("./db");


const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("welcome to home page");
});

app.use("/users", UserRouter);
app.use("/doctor",doctorRouter)


app.listen(process.env.port, async () => {
  try {
    await connection
    console.log("Db is connected");
  } catch (error) {
    console.log(error);
  }
  console.log(`server is running on port ${process.env.port}`);
});