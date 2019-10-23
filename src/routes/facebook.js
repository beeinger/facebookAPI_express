import { Router } from "express";
const router = Router();
var info;
router.post("/", async (req, res) => {
  info = await req.body;
  return res.send({ error: false });
});
router.get("/", async (req, res) => {
  if (info) {
    return res.send(info);
  } else {
    return res.send("Try logging in first");
  }
});
export default router;
