import express from "express";
const app = express();

app.listen(3000, () => {
  console.log("App running on port 3000");
});

app.get("/", (req, res) => {
  res.status(200).json({ data: "Successful!" });
});
