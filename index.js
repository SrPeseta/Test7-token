const express = require("express");
const app = express();

app.listen(3000, () => {
  console.log("Application started and Listening on http://localhost:3000");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/dApp.html");
});

app.use('/', express.static(__dirname));
