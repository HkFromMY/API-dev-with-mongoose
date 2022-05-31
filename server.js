const express = require('express');
const app = express();
const cors = require('cors');
// const dbo = require('./db/conn');

const PORT = process.env.PORT || 5000;

app.use(cors()); // allows cross origin sharing
app.use(express.json()); // allows transport and parsing of JSON data

// server API endpoints
app.use(require('./routes/employee'));

// listen to the PORT 
app.listen(PORT, () => {
    // dbo.connectToServer(err => {
    //     if (err) console.error(err);
    // });

    console.log(`Server started on port ${PORT}`);
})