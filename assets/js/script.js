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

        // Hide whichever previous section is visible before showing the record workout section, when user is clicking record workout on the workout plans section.
        const menuSection = document.getElementById("menu-section");
        const recordSection = document.getElementById("record-workout-section");
        const plansSection = document.getElementById("workout-plans-section");

        recordSection.classList.remove("d-none");

        if (menuSection) {
            menuSection.classList.add("d-none");
        }

        if (plansSection) {
            plansSection.classList.add("d-none");
        }
    } else if (sectionId === "workout-tips") {
        document.getElementById("workout-tips-section").classList.remove("d-none");
        document.getElementById("menu-section").classList.add("d-none");
    } else if (sectionId === "return-menu-from-workout-plans") {
        document.getElementById("workout-plans-section").classList.add("d-none");
        document.getElementById("menu-section").classList.remove("d-none");
    }
};



// Menu button event listeners
// These call the handleMenuClick function with the correct section ID when a menu button is clicked.
const workoutPlansBtn = document.getElementById("menu-workout-plans-btn");
const recordWorkoutBtn = document.getElementById("menu-record-workout-btn");
const workoutTipsBtn = document.getElementById("menu-workout-tips-btn");
const returnMenuFromWorkoutPlansBtn = document.getElementById("workout-plans-back-btn");

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
if (returnMenuFromWorkoutPlansBtn) {
    returnMenuFromWorkoutPlansBtn.addEventListener("click", function () {
        // Show menu section and hide workout plans section by reusing the handleMenuClick function with the correct section ID.
        handleMenuClick("return-menu-from-workout-plans");
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


/**This function displays the workout plan for the correct workout type (push, pull, or legs) in the workout plan display.*/
function displayWorkoutPlan(type) {
    // Calls the getWorkoutPlans function to retrieve the workout plan for the specified type
    const plans = getWorkoutPlans(type);
    // Gets the workout plan display element from the DOM
    const display = document.getElementById("workout-plan-display");
    // If no workout plan is found for the specific type, display a message indicating that no workout was found. Else, display the workout plan.
    if (plans.length === 0) {
        display.innerHTML = "No workout found";
    } else {
        // .join(" ") converts the array into a single string, adding a space and line break between each exercise.
        display.innerHTML = plans.join("<br>");
    }
}


// Workout plans section event listeners

/**This function prepares the event listeners for the workout plans section.*/
function workoutPlansEventListeners() {
    const pushButton = document.getElementById("push-workout-btn");
    const pullButton = document.getElementById("pull-workout-btn");
    const legsButton = document.getElementById("legs-workout-btn");
    const recordFromPlansBtn = document.getElementById("workout-plans-record-btn");

    // These event listeners listen for clicks on the push, pull, and legs workout buttons, and call the displayWorkoutPlan function with the correct workout type to display the corresponding workout plan.

    //if pushButton exists, add an event listener to it that listens for a click event and calls the displayWorkoutPlan function with the argument "push" to display the push workout plan.
    if (pushButton) {
        pushButton.addEventListener("click", () => {
            displayWorkoutPlan("push");
        });
    }

    if (pullButton) {
        pullButton.addEventListener("click", () => {
            displayWorkoutPlan("pull");
        });
    }
    if (legsButton) {
        legsButton.addEventListener("click", () => {
            displayWorkoutPlan("legs");
        });
    }

    // This event listener listens for a click on the record workout button in the workout plans section, on click it calls the handleMenuClick function with the correct record-workout section ID
    //  to show the record workout section and hide the workout plans section.
    if (recordFromPlansBtn) {
        recordFromPlansBtn.addEventListener("click", () => {
            handleMenuClick("record-workout");
        });
    }
};

// This event listener waits for the DOM content to be fully loaded before setting up the event listeners for the workout plans section.
document.addEventListener("DOMContentLoaded", () => {
    workoutPlansEventListeners();
});

/**This function calculates the total volume (performance) of a workout based on the number 
// of sets, reps, and weight lifted. Volume is calculated as sets x reps x weight. */
function calculateVolume(sets, reps, weight) {
    const volume = sets * reps * weight;
    return volume;
}

/**This function provides feedback based on the total volume of a workout. */
function getPerformanceFeedback(volume) {
    const lowThreshold = 1000;
    const moderateThreshold = 3000;

    if (volume < lowThreshold) {
        return "Low effort";
    } else if (volume < moderateThreshold) {
        return "Moderate effort";
    } else {
        return "High effort";
    }
}

/**This function processes the workout input and calculates the total volume, and provides feedback based on the volume. */
function processWorkoutInput(sets, reps, weight) {
    // This first if statment validates the inputs by checking there are falsy values (empty, negative, or invalid non-numerical inputs). If sets or reps or weight are empty negative or invalid,
    // it returns a volume of 0 and an error message in the feedback to tell the user needs to enter valid numbers. 
    if (
        isNaN(sets) || isNaN(reps) || isNaN(weight) ||
        sets <= 0 || reps <= 0 || weight <= 0
    ) {
        return {
            volume: 0,
            feedback: "Please enter valid numbers"
        };
    }

    // Calculate the total volume of the workout using the calculateVolume function
    const volume = calculateVolume(sets, reps, weight);

    // Get performance feedback based on the calculated volume using the getPerformanceFeedback function
    const feedback = getPerformanceFeedback(volume);

    // Then returns and object with the calculated volume and feedback, which can be used to update the DOM.
    return {
        volume,
        feedback
    };
}

//RESULTS SECTION FUNCTIONALITY

/** This function displays the workout results in the results section. */
function displayWorkoutResults(exercise, result) {

    // Hide record workout section after submitting workout input.
    document.getElementById("record-workout-section").classList.add("d-none");

    // Show results section after submitting workout input.    
    document.getElementById("results-section").classList.remove("d-none");

    // Update result fields in the DOM with the exercise name, calculated volume, and performance feedback based on user's workout input.
    document.getElementById("result-exercise").textContent = exercise;
    document.getElementById("volume-output").textContent = result.volume;
    document.getElementById("performance-output").textContent = result.feedback;
    document.getElementById("feedback-message").textContent = result.feedback;

    // Get the feedback image element from the DOM to update it based on the performance feedback, providing visual feedback to the user 
    // based on their workout performance. There are different images for low, moderate, and high effort.
    const image = document.getElementById("feedback-image");

    // This sets the correct src based on the feedback provided in the result object. 
    let imageSrc = "";

    // Depending on the feedback (low effort, moderate effort, or high effort), the specific src is set.
    if (result.feedback === "Low effort") {
        imageSrc = "assets/images/low-effort.webp";
    } else if (result.feedback === "Moderate effort") {
        imageSrc = "assets/images/moderate-effort.webp";
    } else if (result.feedback === "High effort") {
        imageSrc = "assets/images/high-effort.webp";
    }

    // Update and show the feedback image - the src is updated based on the feedback, and the d-none class is removed to display the image, 
    // giving visual feedback to the user based on workout performance.
    image.setAttribute("src", imageSrc);
    image.classList.remove("d-none");
    image.setAttribute("alt", `${result.feedback} workout feedback`);
}

/** This function handles the workout calculation by retrieving user input, processing it, and displaying the results. */
function handleWorkoutCalculation() {
    // Retrieve user input values for exercise name, sets, reps, and weight from the DOM.
    const exercise = document.getElementById("exercise-name").value;
    const sets = document.getElementById("sets").value;
    const reps = document.getElementById("reps").value;
    const weight = document.getElementById("weight").value;

    // Process the workout input using the processWorkoutInput function to calculate volume and get feedback 
    const result = processWorkoutInput(sets, reps, weight);

    // Display the workout results in the DOM using the displayWorkoutResults function, this shows the exercise name and the results.
    displayWorkoutResults(exercise, result);
}

// This code exports functions to script.test.js for testing. I had to add this code as the app wasn't working in the browser without it, and 
// I needed to export the functions for testing in script.test.js.
if (typeof module !== "undefined") {
    module.exports = { handleMenuClick, getWorkoutPlans, workoutPlans, displayWorkoutPlan, workoutPlansEventListeners, calculateVolume, getPerformanceFeedback, processWorkoutInput, displayWorkoutResults, handleWorkoutCalculation };
}

// This code exports functions to script.test.js for testing.
module.exports = { handleMenuClick, getWorkoutPlans, workoutPlans, displayWorkoutPlan, workoutPlansEventListeners, calculateVolume, getPerformanceFeedback, processWorkoutInput, displayWorkoutResults, handleWorkoutCalculation };

// JQUERIES - These are placed at the bottom of the js file as they involve DOM manipulation, the DOM needs to be fully loaded before 
// the jQuery code can interact with the elements, otherwise it would not work as the elements would not be found.

// This code checks if jQuery is loaded before trying to use it, preventing errors if jQuery is not available. 
if (typeof $ !== "undefined") {
    // Document ready function so that the DOM is fully loaded before attaching event listeners. This is required for jQuery to work correctly, 
    // as it needs to interact with DOM elements.
    $(document).ready(function () {
        // This code uses jQuery to listen for the submit event on the workout form with the ID "workout-form". 
        $("#workout-form").on("submit", function (e) {
            // When the form is submitted e.preventDefault() is used to prevent the default form submission behavior (it would usually refresh the page).
            e.preventDefault();
            // Then the handleWorkoutCalculation function is called to process the workout input and display the results without refreshing the page.
            handleWorkoutCalculation();
        });
    });
}