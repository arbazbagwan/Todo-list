const express = require("express");
const router = express.Router();

const {createTodo, gettodaystodo, getalltodos, deleteTodo} = require('../controller/todo')

router.post("/create", createTodo);
router.get("/todo", gettodaystodo);
router.get("/upcomming", getalltodos);
router.delete("/delete/:listid", deleteTodo);

module.exports = router;
