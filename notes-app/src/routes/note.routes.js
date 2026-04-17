const express = require("express");
const NoteRouter = express.Router();

const NoteController = require("../controllers/note.controllers");

NoteRouter.get("/test", (req, res) => {
  res.status(200).json({ msg: "hii my name is chirag" });
});

NoteRouter.post("/create", NoteController.CreateNote);
NoteRouter.post("/bulk-create", NoteController.createNotesBulk);

module.exports = NoteRouter;