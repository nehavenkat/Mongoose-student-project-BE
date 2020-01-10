const express = require('express');
const fs = require('fs');
const path = require('path');
const Project = require("../../models/project");
const CORS = require('cors');

const projectsFilePath = path.join(__dirname, 'projects.json');
//const router = express.Router(); // will be the middleware that will take care for this route
const projectRouter = express.Router();
/***
 * read a file and decode the content
 * @returns {any}
 */
//const readFile = () => {
   // const buffer = fs.readFileSync(projectsFilePath);
   // const content = buffer.toString();
   // return JSON.parse(content);
//};

const readProjects = async () => {
    return await Project.find();
};

//router.get('/', (req, res) => {
    //this will respond to each get on the /students
 //   res.send(readFile()); //and will return in the response the list of students
//});

projectRouter.get("/", async (req, res)=>{
    if (req.query.category)
        return res.send(await Project.find({ category: req.query.category}));
    const projects = await Project.find({}); //get all the elements in the collection books
    res.send(projects);
});

//router.get('/:id', (req, res) => {
    //this wil get /students/:id
  //  let projects = readFile(); //reads all the students
    // res.set('Access-Control-Allow-Origin', '*');//
    //let project = projects.find(x => x._id === parseInt(req.params.id)); //search for the projects with the given id
    //if (project)// parseInt => when passeing from URL it will change into number.
        //if not undefined!
      //  res.send(project);
    //return if found
    //else res.status(404).send('Not found'); //or error
//});

projectRouter.get("/:projectID", async(req,res)=>{
    //find one will "cycle" through the collection and will break / return on the first element that match the condition
    const student = await Project.findOne({ _id: req.params.projectID});
    //const book = await Project.findByID(req.params.studentID);
    if (project)
        res.send(project);
    else
        res.status(404).send("Not found")
});
// WE can use tis instead of a "CORS"
//router.options('/', (req, res) => {
  //  res.set({
    //    'Access-Control-Allow-Origin': '*',
      //  'Access-Control-Allow-Headers': 'content-type',
       // 'Access-Control-Allow-Methods': 'GET,POST,PUT,OPTIONS'
    //});
    //res.send();
// });

projectRouter.put("/:projectID", async (req, res)=>{

    // delete req.body.projectID;
    delete req.body._id;

    const project = await Project.findOneAndUpdate(
        { _id: req.params.projectID },  //query: what we are looking for. In this case, the first element with the ASIN = req.params.asin
        { $set: //$set: we want to change the object with the information that I'm passing. It's like the Object.assign(dbObject, newObject)
                { ...req.body } //using the spread operator, we are selecting all the properties that we want to change
        });
    if (project)
        res.send(project);
    else
        res.status(404).send("Not found " +req.params.projectID);
});
// router.post('/', async (req, res) => {
    //this will handle POST /students
  //  var previousProjects = readFile(); //reads the students from the disk
   // if (previousProjects.find(project => project.studentID == req.body.studentID)) {
        //check if a previously created student has the same email
     //   res.status(500).send('Cannot create: studentID already exists');
   // } //if so, throws an error

    // create an id from the timestamp
    //req.body._id = Date.now(); //create a new id// to be unique
    //req.body.creationTime = new Date(); //add the creationTime
    //req.body.studentID = previousProjects.length + 1;
    //if (req.body.picture && req.body.picture.indexOf('http') >= 0) {
     //   req.body.picture = await fetchImage(req.body.picture);
    //}

   // previousProjects.push(req.body); //push the item into the students array
    //fs.writeFileSync(projectsFilePath, JSON.stringify(previousProjects)); //override the previous array on the harddrive
    //res.send({ _id: req.body._id }); //return the newly generated ID
//});

projectRouter.post("/", async (req, res)=>{
   try{
        const newProject = await Project.create(req.body);
        newProject.save();
        res.send(newProject);
    }
    catch(exx){
        res.status(500).send(exx);
    }
});


//[router.put('/:id', async (req, res) => {
    //handle PUT /students/:id
    //console.log(req.body);
   // let projects = readFile(); //get all the students
    //let project = projects.find(x => x._id == req.params.id); //search for the student with the given ID
    //if (project) {
        //if not undefined!
      //  if (req.body.picture && req.body.picture.indexOf('http') >= 0) {
        //    req.body.picture = await fetchImage(req.body.picture);
        //}
        //req.body.updateTime = new Date(); //add the updateTime
        //let mergedProject = Object.assign(project, req.body); //copy the properties in req.body on student
        //let position = projects.indexOf(project); //students[req.params.id - 1] = mergedStudent
        //projects[position] = mergedProject; //assign the student
        //fs.writeFileSync(projectsFilePath, JSON.stringify(projects)); //override the students on disk
        //res.send(mergedProject); //return the student
    //} else res.status(404).send('Not found');
//});
projectRouter.delete("/:projectID", async (req, res)=>{
    const result = await Project.deleteOne({ _id: req.params.projectID});
    if (result)
        res.send(result);
    else
        res.status(404).send("not found");
});


//router.delete('/:id', (req, res) => {
    //handle DELETE on /students/:id
  //  let projects = readFile();
    //let projectsToRemain = projects.filter(x => x._id !== parseInt(req.params.id)); //keeps only the elements with a different id
    //console.log(projectsToRemain);
    //if (projectsToRemain.length < projects.length) {
        //if the size of the arrays are different
      //  fs.writeFileSync(projectsFilePath, JSON.stringify(projectsToRemain)); //write it down
       // res.send('Removed');
    //} else res.status(404).send('Not found');
//});

module.exports = projectRouter;