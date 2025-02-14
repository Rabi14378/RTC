import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Hello world<h1>");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
