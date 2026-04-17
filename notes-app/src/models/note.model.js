// step 1 


const mongoose = require("mongoose");

// create schema --> 

const NoteSchema = new mongoose.Schema({

title:{type: String, required:true},
content:{type: String, required:true},
category:{type: String, 
    enum:["work","personal","study"],
    default:"study"
},

isPinned:{type:Boolean, default:false}
})

// model 

const Note = mongoose.model("Note",NoteSchema);

module.exports = Note;
