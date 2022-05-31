const mongoose = require('mongoose');

const MongoClient = require('mongodb').MongoClient;
const URL = 'mongodb://localhost:27017';
const database = 'EmployeesDB';

// var _db;
// module.exports = {
//     connectToServer: (callback) => {
//         MongoClient.connect(URL, (err, db) => {
//             if (db) {
//                 _db = db.db("EmployeesDB");
//                 console.log("Successfully connects to the database!");
//             }
//             return callback(err);
//         });
//     },
//     getDb: () => _db
// };

class Database {
    constructor() {
        this.employeeModel = new mongoose.Schema({
            name: {
                type: String,
                required: true,
                unique: false,
                lowercase: true
            },
            age: {
                type: Number,
                required: true,
                unique: false,
                lowercase: true
            },
            hobby: {
                type: String,
                required: false,
                unique: false,
                lowercase: true
            },
            
        });
        this.employeeModel = mongoose.model("Employee", this.employeeModel);

        this._connect();
    }

    _connect() {
        mongoose.connect((URL + '/' + database))
            .then(() => {
                console.log("Database connects successfully");
            })
            .catch(err => console.error("Database connections error!"));
    }

    async getAllEmployees() {
        await this.employeeModel
            .find()
            .then(doc => this.resultData = doc)
            .catch(err => console.error(err));

        return this.resultData;
    }

    async getOneEmployee(id) {
        // it is not necessary to convert id into ObjectId's instance
        await this.employeeModel
            .find({ _id: id })
            .then(doc => this.resultData = doc)
            .catch(err => console.error(err));
        
        return this.resultData;
    }

    async insertEmployee(name, age, hobby) {
        let newEmp = await new this.employeeModel({
            name: name,
            age, age,
            hobby: hobby
        });

        await newEmp.save()
            .then(doc => this.resultData = doc)
            .catch(err => {
                if (err) throw err;
            });

        return this.resultData;
    }

    async updateEmployee(id, newName, newAge, newHobby) {
        let updatedInfo = {
            name: newName,
            age: newAge,
            hobby: newHobby,
        };

        await this.employeeModel
            .findOneAndUpdate(
                {
                    // search query
                    _id: id
                },
                updatedInfo,
                {
                    new: true,  // returns updated doc
                    runValidators: true  // runs validator for validation purpose
                }
            )
            .then(doc => this.resultData = doc)
            .catch(err => console.error(err));
        
        return this.resultData;
    }

    async deleteEmployee(id) {
        await this.employeeModel
            .findOneAndRemove({ _id: id })
            .then(doc => this.resultData = doc)
            .catch(err => console.error(err));

        return this.resultData;
    }

    getModel() { return this.employeeModel; }
    getResultData() { return this.resultData; }
}

module.exports = new Database();