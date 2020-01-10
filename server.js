const express = require("express");
const cors = require('cors');
const listEndpoints = require("express-list-endpoints");
const projectRouter = require("./src/services/projects/projects");// routing it on server with /projects
const studentRouter = require('./src/services/students/students');
const projectSchema = require("./src/models/project")
const studentSchema = require("./src/models/student")
const server = express(); // Create http server with express
const mongoose = require("mongoose");


const port = 3100;// assigning the port number

const local = "mongodb://127.0.0.1:27017/studentprojects";

mongoose.connect(local,{useNewUrlParser: true})
        .then(db => console.log("MongoDB Connected") 
            , err => console.log("ERROR connecting to MongoDb", err))


server.use(express.json()); // To parse request bodies into objects
//when data is received it will parserit ==>req.body
server.use(cors());//  cross origin resource sharing



server.get("/", (req, res) => {
    res.send("I'm listening.")
})
server.use('/students', studentRouter);
server.use('/projects', projectRouter);// Each request on http://localhost:3100/projects is handled by ProjectsRouter
console.log(listEndpoints(server));


 server.listen(port, () => {
 //Server run and listen to connections on port 3100
 console.log(`Server is running on port ${port}`);
});