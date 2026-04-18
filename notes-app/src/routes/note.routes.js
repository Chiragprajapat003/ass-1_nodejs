const express = require("express");
const NoteRouter = express.Router();

const NoteController = require("../controllers/note.controllers");

NoteRouter.get("/test", (req, res) => {
  res.status(200).json({ msg: "hii my name is chirag" });
});

NoteRouter.post("/create", NoteController.CreateNote);
NoteRouter.post("/bulk-create", NoteController.createNotesBulk);
NoteRouter.get("/", NoteController.getAllNotes);
NoteRouter.get("/:id", NoteController.getbyID);
NoteRouter.put("/:id", NoteController.replaceNote);
NoteRouter.patch("/:id", NoteController.updateField);
NoteRouter.delete("/bulk", NoteController.deleteMultiNote);
module.exports = NoteRouter;