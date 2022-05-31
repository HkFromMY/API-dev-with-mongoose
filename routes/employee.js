const express = require('express');
const employeeRouter = express.Router();
const dbo = require('../db/conn');
const ObjectId = require('mongodb').ObjectId;

// get all employees' details
// employeeRouter.get('/employees', (req, res) => {
//     let db_connect = dbo.getDb();
//     db_connect
//       .collection("employees")
//       .find()
//       .toArray((err, result) => {
//           if (err) throw err;
//           res.json(result);
//       })
// });

// get an employee's data by its id
// employeeRouter.get('/employees/:id', (req, res) => {
//     let db_connect = dbo.getDb();
//     try {
//         let query = { _id: ObjectId(req.params.id) };
//         db_connect
//             .collection("employees")
//             .findOne(query, (err, result) => {
//                 if (err) throw err;
//                 res.json(result);
//             });

//     } catch(err) {
//         console.log(err);
//         res.status(400).send("Bad URL parameters");
//     }
    
// });

// add a new employee's details
// employeeRouter.post('/employees/add', (req, res) => {
//     let db_connect = dbo.getDb();
//     let employee = {
//         name: req.body.name,
//         age: req.body.age,
//         hobby: req.body.hobby
//     };

//     if (Object.values(employee).some(value => value === '' || value === null)) {
//         res.status(400).send("Some details are missing");
//         return;
//     }

//     db_connect
//       .collection("employees")
//       .insertOne(employee, (err, result) => {
//           if (err) throw err;
//           res.json(result);
//       });
// });

// update an employee's details
// employeeRouter.patch('/employees/update/:id', (req, res) => {
//     let db_connect = dbo.getDb();
//     try {
//         let query = { _id: ObjectId(req.params.id) };
//         let updatedInfo = {
//             $set: {
//                 name: req.body.name,
//                 age: req.body.age,
//                 hobby: req.body.hobby
//             }
//         };
    
//         db_connect
//           .collection("employees")
//           .updateOne(query, updatedInfo, (err, result) => {
//               if (err) throw err;
//               res.json(result);
//           });
//     } catch(err) {
//         console.log(err);
//         res.status(400).send("Bad URL parameter");
//     }
// });

// delete an employee's details by its id
// employeeRouter.delete('/employees/delete/:id', (req, res) => {
//     let db_connect = dbo.getDb();

//     try {
//         let query = { _id: ObjectId(req.params.id) };
//         db_connect
//           .collection("employees")
//           .deleteOne(query, (err, result) => {
//               if (err) throw err;
//               res.json(result);
//           });
//     } catch(err) {
//         console.log(err);
//         res.status(400).send("Bad URL parameter");
//     }
// });

employeeRouter.get('/employees', async (req, res) => {
    let allEmployees = await dbo.getAllEmployees();
    res.json(allEmployees);
});

employeeRouter.get('/employees/:id', async (req, res) => {
    let employee = await dbo.getOneEmployee(req.params.id);
    res.json(employee);
});

employeeRouter.post('/employees/add', async (req, res) => {
    try {
        let { name, age, hobby } = await req.body;
        await dbo.insertEmployee(name, age, hobby);
        res.json({ message: "Employee added successfully!" });

    } catch(err) {
        console.error(err);
        res.status(400).json({ message: "Something went wrong" });
    }
});

employeeRouter.patch('/employees/update/:id', async (req, res) => {
    try {
        let { name, age, hobby } = await req.body;
        await dbo.updateEmployee(req.params.id, name, age, hobby);
        res.json({ message: "Employee updated successfully!" });

    } catch(err) {
        console.error(err);
        res.status(400).json({ message: "Something went wrong" });
    }
});

employeeRouter.delete('/employees/delete/:id', async (req, res) => {
    await dbo.deleteEmployee(req.params.id);
    res.json({ message: "Employee's data deleted successfully!" })
});

module.exports = employeeRouter;