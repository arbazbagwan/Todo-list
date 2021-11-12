const listschema = require('../models/todolist');

//for todays record only
let now = new Date();
let start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 1, 0, 0);
let end = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 59, 59);

//for current date + 1
let upcoming = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 59, 59);


//creating new todo
exports.createTodo = (req, res) => {
  const Listschema = new listschema(req.body);
  Listschema.save((error, todo) => {
    if (error) {
      return res.status(400).json({
        error: "NOT able to save list in DB"
      });
    }
    res.json({ todo });
  });
};

//get only todays list
exports.gettodaystodo = (req, res) => {

  listschema.find({
    sdate: {
      $gte: start,
      $lt: end
    },
    belongsto: req.params.belongsto
  })
    .exec((err, todo) => {
      if (err) {
        return res.status(400).json({
          error: "No list found"
        });
      }
      res.json(todo);
    });
};

//get upcoming list 
exports.getalltodos = (req, res) => {
  listschema.find({
    sdate: {
      $gte: upcoming
    },
    belongsto: req.params.belongsto
  }).exec((err, todo) => {
    if (err) {
      return res.status(400).json({
        error: "No list found"
      });
    }
    res.json(todo);
  });
};

//delete a todo
exports.deleteTodo = (req, res) => {
  listschema.findByIdAndRemove(req.params.listid, (err, list) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete this list"
      });
    }
    res.json({
      message: "Successfull deleted"
    });
  });
};

//edit a todo
exports.gettodobyid = (req, res) => {
  listschema.find({
    _id: req.params.userid
  }).exec((err, edittodo) => {
    if (err) {
      return res.status(400).json({
        error: "ERROR IN GETTING TODO EDIT"
      });
    }
    res.send(edittodo);
  });
};


//update the todo list

exports.updatetodo = (req, res) => {
  listschema.findByIdAndUpdate(
    { _id: req.params.todoid },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, list) => {
      if (err) {
        return res.status(400).json({
          error: "error to update the todo"
        });
      }
      res.json(list);
    }
  );
};

