//importing express router
const express = require('express');
const router = express.Router();


// importing controllers
const {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
    } = require('../controllers/workoutController');

// Get request to get all workouts
router.get('/',getWorkouts);

// Get request to get single workout
router.get('/:id',getWorkout);


// Post request to create new workout
router.post('/',createWorkout);


// Delete request to delete a workout
router.delete('/:id',deleteWorkout);

// update a workout
router.patch('/:id',updateWorkout);


module.exports = router;
