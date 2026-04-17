const express = require('express');
const app = express();
const NoteRouter = require("./routes/note.routes");

app.use(express.json());
app.use("/api/notes", NoteRouter);

module.exports = app;
