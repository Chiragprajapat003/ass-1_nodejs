
const Note = require("../models/note.model")

const CreateNote = async(req ,res) => {
const {title , content , category , isPinned } = req.body;

try{
    // verification --> 
    if(!title || !content){
        return res.status(400).json({
            success: false,
            message:"Title and Content are required feild",
            data:null
        })
    }

    const note = new Note(req.body);

    await note.save();
                 
    // send response

    res.status(201).json({
        success:true,
        message:"notes created",
        data:{}
    })

} catch (err){
    res.status(500).json({msg:'server error.',  error: err.message});
}
}

module.exports = CreateNote
