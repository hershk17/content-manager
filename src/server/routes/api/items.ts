import express from "express";
import { get } from "axios";
import Item, { find, findById } from "../../models/Item";

const router = express.Router();

router.get("/", (req, res) => {
  find().then((items) => res.json(items));
});

router.get("/getData", async (req, res) => {
  await get("https://jsonplaceholder.typicode.com/posts/1")
    .then((response) => res.json(response.data))
    // return 404 if not found
    .catch((err) => res.status(404).json({ error: "Internal Server Error" }));
});

router.put("/:id", (req, res) => {
  findById(req.params.id).then((item) => {
    item
      .update()
      .then(() => res.json({ success: true }))
      // return 404 if not found
      .catch((err) => res.status(404).json({ success: false }));
  });
});

router.post("/", (req, res) => {
  console.log(req);
  const itemToPost = new Item({
    name: req.body.name,
  });
  itemToPost.save().then((item) => res.json(item));
});

router.delete("/:id", (req, res) => {
  findById(req.params.id).then((item) => {
    item
      .remove()
      .then(() =>
        res.json({
          success: true,
        })
      )
      // return 404 if not found
      .catch((err) => res.status(404).json({ success: false }));
  });
});

export default router;
