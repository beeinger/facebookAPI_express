import cors from "cors";
import express from "express";
import routes from "./routes";
import bodyParser from "body-parser";
var port = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/facebook", routes.facebook);
app.get("/", (req, res) => {
  return res.send("hello");
});
app.listen(port, function() {
  console.log(`Example app listening on port!`);
});
