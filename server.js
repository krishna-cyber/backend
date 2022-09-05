const express = require('express');
// express app
const app = express();
require('dotenv').config();
// require mongoose 
const mongoose = require('mongoose');

// requiring cors module
const cors = require('cors');
app.use(cors());




//importing routing workout files
const workoutRoutes = require('./routes/workoutRoute');


// middleware for json
app.use(express.json());

// middleware
app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});
// routes
app.get('/', (req, res) => {
    res.json({ message: 'Hello World' });
    console.log('respond sended');
});

app.use('/api/workout',workoutRoutes);


// connect with database
mongoose.connect(process.env.DATABASE)
.then(()=>{
    console.log(`Database connected successfully`)
    // listen for requests
    app.listen(process.env.PORT,(err)=>{
    if(err){
        console.log(err);
    }
    console.log(`app is listening to port ${process.env.PORT}`);
    })

}).catch((err)=>{console.log(`Database connection error occurred ${err}`)});


