const express = require("express");
const fs = require("fs-extra");
//const { check, validationResult, sanitizeBody } = require('express-validator');
//const multer = require("multer");
//const multerConfig = multer();
const path = require("path");
//const axios = require('axios');
const Student = require("../../models/student");
const cors = require('cors');
const fileLocation = path.join(__dirname, "students.json");
const studentRouter = express.Router();


const readStudents = async () => {
    return await Student.find();
};

studentRouter.get("/", async (req, res)=>{
    if (req.query.category)
        return res.send(await Student.find({ category: req.query.category}));
    const students = await Student.find({}); //get all the elements in the collection books
    res.send(students);
});
studentRouter.get("/:studentID", async(req,res)=>{
    //find one will "cycle" through the collection and will break / return on the first element that match the condition
    const student = await Student.findOne({ _id: req.params.studentID});
    //const book = await Student.findByID(req.params.studentID);
    if (student)
        res.send(student);
    else
        res.status(404).send("Not found")
});
studentRouter.post("/", async (req, res)=>{
    // let students = readStudents(); //reads all the students
    // const student= students.find(student => student.email === req.body.email); //if there is a student with the given email
    // if(student!==undefined){
    //     res.status(400).send("email in use");
    //
    // }
    try{
        const newStudent = await Student.create(req.body);
        newStudent.save();
        res.send(newStudent);
    }
    catch(exx){
        res.status(500).send(exx);
    }
});
// studentRouter.post("/total", multerConfig.single("StudentCover"), async (req, res)=> {
//     //saving the file in the images folder
//     const fileName = req.body.studentID + path.extname(req.file.originalname); //create a new filename like ASIN.ext
//     const newImageLocation = path.join(__dirname, "../../../images", fileName); //create the path to my images folder
//     await fs.writeFile(newImageLocation, req.file.buffer); //write down the image on the folder
//
//     req.body.img = req.protocol + '://' + req.get('host') + "/images/" + fileName; //update the book object
//     try{
//         const student = await Student.create(req.body);
//         student.save();
//         res.send(student);
//     }
//     catch(exx){
//         res.status(500).send(exx);
//     }
//
// });
studentRouter.put("/:studentID", async (req, res)=>{

    // delete req.body.studentID;
    delete req.body._id;

    const student = await Student.findOneAndUpdate(
        { _id: req.params.studentID },  //query: what we are looking for. In this case, the first element with the ASIN = req.params.asin
        { $set: //$set: we want to change the object with the information that I'm passing. It's like the Object.assign(dbObject, newObject)
                { ...req.body } //using the spread operator, we are selecting all the properties that we want to change
        });
    if (student)
        res.send(student);
    else
        res.status(404).send("Not found " +req.params.studentID);
});

studentRouter.delete("/:studentID", async (req, res)=>{
    const result = await Student.deleteOne({ _id: req.params.studentID});
    if (result)
        res.send(result);
    else
        res.status(404).send("not found");
});

studentRouter.post("/checkEmail/:email",async (req, res) => {  //handles POST /students/checkemail/{email}
    let students = readStudents(); //reads all the students
    res.send(students.find(student => student.email === req.params.email)  //if there is a student with the given email
        ? "Email in use"  //<= returns Email in use
        : "Email not in use");  //returns email not in use
});
module.exports = studentRouter;