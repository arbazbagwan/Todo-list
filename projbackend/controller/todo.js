const listschema = require('../models/todolist');

let now  = new Date();
let start = new Date(now.getFullYear(),now.getMonth(),now.getDate(),1,0,0);
let end = new Date(now.getFullYear(),now.getMonth(),now.getDate()+1,0,59,59);


  exports.createTodo = (req, res) => {
    const Listschema = new listschema(req.body);
    Listschema.save((error, todo) => {
      if (error) {
        return res.status(400).json({
          error:"NOT able to save list in DB"
        });
      }
      res.json({ todo });
    });
  };

  exports.gettodaystodo = (req, res) => {
    listschema.find({
      sdate: {
        $gte: start,
        $lt: end
      }
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

  exports.getalltodos = (req, res) =>{
    listschema.find().exec((err, todo) => {
      if (err) {
        return res.status(400).json({
          error: "No list found"
        });
      }
      res.json(todo);
    });
  };
  

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

  
  