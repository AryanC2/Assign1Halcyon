const express = require('express');
const app = express();
// const swaggerjsdoc = yaml;
const port = process.env.PORT || 9999;
const swaggerjsdoc = require("swagger-jsdoc");
const swaggerui = require("swagger-ui-express");
require("./Dbconn")
const bodyparser = require("body-parser")
const Student = require('./Schema');

const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Students database API",
        version: "1.0.0",
        description:
          "This is a simple Students API application by Aryan made with Express and documented with Swagger",
        contact: {
          name: "Aryan",
          url: "aryan.com",
          email: "ac@email.com",
        },
      },
      servers: [
        {
          url: "http://localhost:9999",
        },
      ],
    },
    apis : ["MainApi.js"],
  };

  const specs = swaggerjsdoc(options);
  app.use("/api-docs", swaggerui.serve, swaggerui.setup(specs));

app.use(express.json());


//YAML
/**
 * @swagger
 * components:
 *   schemas:
 *     Students:
 *       type: object
 *       required:
 *         - name
 *         - phone
 *         - email
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the movie
 *         name:
 *           type: string
 *           description: name of the student
 *         phone:
 *           type: number
 *           description: phone of the student
 *         email:
 *           type: string
 *           description: Email of the student
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the record was added
 *     
 */

/**
 * @swagger
 * /movie:
 *   get:
 *     summary: Lists all the students
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: The list of the students
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Students'
 */
app.get('/students', async (req,res)=>{
    try{
        const studentsdata = await Student.find();
        res.send(studentsdata);
    }catch(e){
        res.send(e)
    }
});

/**
 * @swagger
 * /students/{id}:
 *   get:
 *     summary: Get the student by id
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The student id
 *     responses:
 *       200:
 *         description: The student response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Students'
 *       404:
 *         description: The movie was not found
 */
app.get('/students/:id', async (req,res)=>{
    try{
        const _id = req.params;
        const studentsdata = Student.findById(_id);
        if(!studentsdata){
            return res.status(404).send();
        }else{
            res.send(studentsdata)
        }
        res.send(req.params.id)
    }catch(e){
        res.status(400).send(e);

    }
});


/**
 * @swagger
 * /add:
 *  post:
 *     summary: Create a new record of a student
 *     tags: [Studentss]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Students'
 *     responses:
 *       200:
 *         description: The created record.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Students'
 *       500:
 *         description: Some server error
 */
app.post('/add', async (req, res) => 
{
    try{
        const user = new Student(req.body);
        const createuser = await user.save();
        res.Status(201).send(createuser)
    }catch(e){res.status(400).send(e);}
});


/**
 * @swagger
 * /students/update/{id}:
 *   patch:
 *    summary: Update the student by the id
 *    tags: [Students]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The student id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Students'
 *    responses:
 *      200:
 *        description: The student was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Students'
 *      404:
 *        description: The student was not found
 *      500:
 *        description: Some error happened
 */
app.patch("/students/:id", async(req,res)=>{
    try{
        const _id = req.params.id;
        const updatestudents = await Student.findByIdAndUpdate(_id, req.body, {
            new : true
        });
        res.send(updatestudents);
    }catch(e){
        res.status(400).send(e);
    }
});


/**
 * @swagger
 * /students/delete/{id}:
 *   delete:
 *     summary: Remove the student by id
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The student id
 *
 *     responses:
 *       200:
 *         description: The student was deleted
 *       404:
 *         description: The student was not found
 */
app.delete("/students/:id", async(req,res)=>{
    try{
        const deletestudent = await Student.findByIdAndDelete(req.params.id);
        if(!req.params.id){
            return res.ststud(400).send();
        }
        res.send(deletestudent);
    }catch(e){
        res.status(500).send(e);
    }
});

app.listen(port, () => 
{
    console.log(`App listening on port ${port}!`)
});