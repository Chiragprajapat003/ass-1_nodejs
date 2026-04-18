const { default: mongoose } = require("mongoose");
const Note = require("../models/note.model");

// post 1 data -> 1
const CreateNote = async (req, res) => {
  const { title, content, category, isPinned } = req.body || {};

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
      message: "Server error",
      error: err.message,
    });
  }
};

// post bulk data ->2

const createNotesBulk = async (req, res) => {
  try {
    const { notes } = req.body || {};

    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: "Request body is required. Send valid JSON.",
        data: null,
      });
    }

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

// getall notes --> 3

const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find();

    return res.status(200).json({
      success: true,
      message: "Notes fetched successfully",
      data: notes,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      data: null,
    });
  }
};

// Get a single note by ID ---> 4

const getbyID = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Note fetched successfully",
      data: note,
    });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID",
        data: null,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server error",
      data: null,
    });
  }
};


module.exports = {
  CreateNote,
  createNotesBulk,
  getAllNotes,
  getbyID,
 
};
