import express from "express";

import bodyParser = require("body-parser");
import { tempData} from "./temp-data";

const app = express();

const PORT = 8888;
// changed Page size to tempdata.length to view all of the matches.
// if a new match enters the db it will display without having to make any change.
const PAGE_SIZE = tempData.length;

var data = tempData;
var approved = 0;
var declined = 0;

app.use(bodyParser.json());

app.use((_, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

app.get("/", (req, res) => {
  res.send("dev api status - up");
});

app.get("/api/match", (req, res) => {
  const page = req.query.page || 1;

  const paginatedData = data.slice(
    (Number(page) - 1) * PAGE_SIZE,
    Number(page) * PAGE_SIZE
  );
  res.send({
    paginatedData: paginatedData,
    approved: approved,
    declined: declined,
  });
});
app.post("/delete", (req, res) => {
  if(req.query.approvedOrDenied === 'approved'){
    approved += 1;
  }
  else{
    declined += 1;
  }
  data = data.filter((match:any) => req.query.id !== match.id);
  res.redirect('/api/match');
})

app.listen(PORT);
console.log("server running", PORT);
