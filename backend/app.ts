import express from "express";

const app = express();

app.use("/", (req, res) => {
  console.log("req.ip:", req.ip);
  res.send("<h1>Hello World!</h1>");
});

const port = (process.env.PORT || 3000) as number;

app.listen(port, () => {
  console.log(`Server in listening on port: ${port}`);
  console.log("Current Time:", new Date().toLocaleTimeString());
});
