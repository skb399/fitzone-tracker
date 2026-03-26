// script.js


//MENU PAGE BUTTON FUNCTIONALITY
/**
 * This function handles the click events for the menu buttons and displays the correct sections while hiding the menu section.
 * I've decided not to use JQUERY for this function as it's a simple function and I can use JQUERY for something more complex later on.
 */
function handleMenuClick(sectionId) {
    if (sectionId === "workout-plans") {
        document.getElementById("workout-plans-section").classList.remove("d-none");
        document.getElementById("menu-section").classList.add("d-none");
    } else if (sectionId === "record-workout") {
        document.getElementById("record-workout-section").classList.remove("d-none");
        document.getElementById("menu-section").classList.add("d-none");
    } else if (sectionId === "workout-tips") {
        document.getElementById("workout-tips-section").classList.remove("d-none");
        document.getElementById("menu-section").classList.add("d-none");
    }
};

// Menu button event listeners
// These call the handleMenuClick function with the correct section ID when a menu button is clicked.
const workoutPlansBtn = document.getElementById("menu-workout-plans-btn");
const recordWorkoutBtn = document.getElementById("menu-record-workout-btn");
const workoutTipsBtn = document.getElementById("menu-workout-tips-btn");

if (workoutPlansBtn) {
    workoutPlansBtn.addEventListener("click", function () {
        handleMenuClick("workout-plans");
    });
}

if (recordWorkoutBtn) {
    recordWorkoutBtn.addEventListener("click", function () {
        handleMenuClick("record-workout");
    });
}

if (workoutTipsBtn) {
    workoutTipsBtn.addEventListener("click", function () {
        handleMenuClick("workout-tips");
    });
}


//WORKOUT PLANS PAGE FUNCTIONALITY

/** This object contains sample workout plans for each workout type, which can be displayed in the workout plan section of the FitZone Tracker application. */
const workoutPlans = {
    push: [
        "Bench Press - 4 sets x 8 reps",
        "Incline Dumbbell Press - 3 sets x 10 reps",
        "Shoulder Press - 3 sets x 10 reps",
        "Tricep Dips - 3 sets x 12 reps"
    ],
    pull: [
        "Deadlift - 4 sets x 6 reps",
        "Lat Pulldown - 3 sets x 10 reps",
        "Seated Row - 3 sets x 10 reps",
        "Bicep Curls - 3 sets x 12 reps"
    ],
    legs: [
        "Squats - 4 sets x 8 reps",
        "Leg Press - 3 sets x 10 reps",
        "Lunges - 3 sets x 12 reps",
        "Hamstring Curls - 3 sets x 12 reps"
    ]
};

/**
 * This function retrieves the workout plan for the corresponding workout type (push, pull, or legs) from the workoutPlans object.
 * This is triggered when the user clicks the corresponding button to view the workout plan.
 */
function getWorkoutPlans(type) {
    return workoutPlans[type] || [];
}



function displayWorkoutPlan(type) {
    const plans = getWorkoutPlans(type);
    const display = document.getElementById("workout-plan-display");

    if (plans.length === 0) {
        display.innerHTML = "No workout found";
    } else {
        // .join(" ") converts the array into a single string, adding a space and line break between each exercise
        display.innerHTML = plans.join("<br>");
    }
}


// This code exports functions to script.test.js for testing.
if (typeof module !== "undefined") {
    module.exports = { handleMenuClick, getWorkoutPlans, workoutPlans, displayWorkoutPlan };
}

// This code exports functions to script.test.js for testing.
module.exports = { handleMenuClick, getWorkoutPlans, workoutPlans, displayWorkoutPlan };

