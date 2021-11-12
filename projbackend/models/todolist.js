const mongoose = require('mongoose');

var listschema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        minlength: 3,
    },
    description:{
        type: String,
        required: true,
        minlength: 3,
    },
    sdate: { 
        type: Date,
    },
    belongsto: {
        type: String,
    },
})

module.exports = mongoose.model("listSchema", listschema);
