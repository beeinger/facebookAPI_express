import { Router } from "express";
import https from "https";
const router = Router();
var user;
var data;

router.post("/", async (req, res) => {
  var info = await req.body;
  if (req.body && req.body.accessToken && req.body.userID) {
    user = {
      userID: info.userID,
      accessToken: info.accessToken
    };
    importFacebook(user.userID, user.accessToken, done);
  }
  return res.send(info);
});

router.get("/user", async (req, res) => {
  if (user) {
    return res.send(user);
  } else {
    return res.send("Try logging in first");
  }
});

router.get("/friends", async (req, res) => {
  if (data) {
    return res.send(data);
  } else {
    return res.send("Try logging in first");
  }
});

function done(parcel) {
  console.log("callback", parcel);
}

function importFacebook(userID, accessToken, cb) {
  var options = {
    host: "graph.facebook.com",
    port: 443,
    path: "/v2.9/" + userID + "/taggable_friends?access_token=" + accessToken, //apiPath example: '/me/friends'
    method: "GET"
  };

  var buffer = ""; //this buffer will be populated with the chunks of the data received from facebook
  var request = https.get(options, function(result) {
    result.setEncoding("utf8");
    result.on("data", function(chunk) {
      buffer += chunk;
    });

    result.on("end", function() {
      data = buffer;
      console.log(buffer);
      cb();
    });
  });

  request.on("error", function(e) {
    console.log("error from facebook.getFbData: " + e.message);
    cb();
  });

  request.end();
}

export default router;
