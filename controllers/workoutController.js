// importing workout model
const Workout = require('../models/workoutModel');

// importing mongoose
const mongoose = require('mongoose');


// get all workouts
const getWorkouts = async(req,res)=>{
    const workouts = await Workout.find({}).sort({createdAt:-1});

    res.status(200).json(workouts);
}


// get a single workouts
const getWorkout = async (req,res)=>{
    const {id}=req.params;

    // checking the given id is valid or not
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message:"No valid object id detected and no such workout found"});
    }

    const workout = await Workout.findById(id); 

    if(!workout){
        return res.status(404).json({message:"No such workout found"});
    }

    res.status(200).json(workout);
}



// create a new workout
const createWorkout = async (req,res)=>{
    const {title,reps,load}= req.body;

    // adding document to database
    try{
        const workout = await Workout.create({title,reps,load});
        res.status(200).json(workout);
    }
    catch(err){
        res.status(400).json({message:err.message});
        console.log(err.message);
    }
    }

// Delete a workout
const deleteWorkout = async (req,res)=>{
    const {id}=req.params;

    // checking the given id is valid or not
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({message:"No valid object id detected and no such item found"});
    }

    const workout = await Workout.findByIdAndDelete({_id:id});

    // checking if workout not found
    if(!workout){
        return(
        res.status(400).json({message:"No such workout found"})
        );
    }
    res.status(200).json({message:"Workout deleted successfully"});
}


// update a workout
const updateWorkout = async (req,res)=>{
    const {id}=req.params;

    // checking the given id is valid or not
    if(!mongoose.Types.ObjectId.isValid(id)){
       return res.status(400).json({message:"No valid object id detected and no such item found"});
    }

    const workout = await Workout.findByIdAndUpdate({_id:id},{...req.body});

    // checking if workout not found
    if(!workout){
        return res.status(404).json({message:"No such workout found"});
    }

    res.status(200).json({message:"workout updated successfully"});
}

// exporting controllers
module.exports={
    getWorkout,
    getWorkouts,
    createWorkout,
    deleteWorkout,
    updateWorkout
}