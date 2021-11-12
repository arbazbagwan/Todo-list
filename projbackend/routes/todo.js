const express = require("express");
const router = express.Router();

const {createTodo, gettodaystodo, getalltodos, deleteTodo, gettodobyid, updatetodo} = require('../controller/todo')

router.post("/create", createTodo);
router.get("/todo/:belongsto", gettodaystodo);
router.get("/upcomming/:belongsto", getalltodos);
router.get("/gettodobyid/:userid", gettodobyid);
router.put("/updatetodo/:todoid", updatetodo);
router.delete("/delete/:listid", deleteTodo);

module.exports = router;
