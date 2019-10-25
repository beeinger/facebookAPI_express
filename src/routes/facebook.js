import { Router } from "express";
import FB from "fb";
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
    FB.api(
      "me",
      {
        fields: ["id", "name", "picture", "email"],
        access_token: user.accessToken
      },
      async function(res) {
        data = await res;
        user = Object.assign(user, res);
        console.log(user);
      }
    );
  }
  return res.send(user);
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

export default router;
