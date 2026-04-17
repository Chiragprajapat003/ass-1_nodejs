
const Note = require("../models/note.model")

const CreateNote = async (req, res) => {
  const { title, content, category, isPinned } = req.body;

  try {
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and Content are required",
        data: null,
      });
    }

    const note = new Note(req.body);
    await note.save();

    return res.status(201).json({
      success: true,
      message: "Note created",
      data: note,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: err.message,
    });
  }
};

const createNotesBulk = async (req, res) => {
  try {
    const { notes } = req.body;

    if (!notes || !Array.isArray(notes) || notes.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Notes array is required and cannot be empty",
        data: null,
      });
    }

    for (let noteData of notes) {
      if (!noteData.title || !noteData.content) {
        return res.status(400).json({
          success: false,
          message: "Each note must have title and content",
          data: null,
        });
      }
    }

    const createdNotes = await Note.insertMany(notes);

    return res.status(201).json({
      success: true,
      message: `${createdNotes.length} notes created successfully`,
      data: createdNotes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  CreateNote,
  createNotesBulk,
};