const express = require("express");


//
const NoteRouter = express.Router();


// Create test router --> 

NoteRouter.get("/test", (req , res)=>{
    res.status(200).json({msg:"hii my name is chirag"})
})

const CreateNote = require("../controllers/note.controllers")
NoteRouter.post("/create" , CreateNote);

module.exports = NoteRouter;