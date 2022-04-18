var express = require("express");
var router = express.Router();
const Todo = require("../models/todo");

// データを全件取得
router.get("/", (req, res) => {
  Todo.find(function (err, result) {
    if (!err) {
      console.log(result);
      return res.json(result);
    } else {
      console.log(err);
      return res.status(500).send("get all todos faild.");
    }
  });
});

// データの1件取得
router.get("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    res.json(todo);
  } catch (err) {
    res.json({ message: err });
  }
});

// データ登録処理
router.post("/", function (req, res) {
  console.log("@pst");
  const todo = new Todo({
    title: req.body.title,
    body: req.body.body,
  });

  todo
    .save()
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

// データ更新処理
router.put("/", async (req, res) => {
  try {
    const updateTodo = await Todo.updateOne(
      { _id: req.body.id },
      { $set: { title: req.body.title, body: req.body.body } }
    );
    res.json(updateTodo);
  } catch (err) {
    res.json({ message: err });
  }
});

// データ削除処理
router.delete("/:id", async (req, res) => {
  await Todo.deleteOne({
    _id: req.params.id,
  })
    .then(() => {
      res.body = { status: "Task Deleted!" };
    })
    .catch((err) => {
      res.body = "error: " + err;
    });
});

module.exports = router;
