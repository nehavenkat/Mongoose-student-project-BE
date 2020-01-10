const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    studentID: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: false
    }
}, {timestamps: true});
const studentList = mongoose.model("student", studentSchema);

module.exports = studentList;