import { Router } from "express";
const router = Router();
var body;
router.post("/", async (req, res) => {
  body = req.body;
  return res.send({ error: false });
});

router.get("/", async (req, res) => {
  if (body) {
    return res.send(body);
  } else {
    return res.send("Try authenticating first");
  }
});

export default router;
