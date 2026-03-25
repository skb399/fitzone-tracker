// script.js


//MENU BUTTON FUNCTIONALITY

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



// This code exports functions to script.test.js for testing.
if (typeof module !== "undefined") {
    module.exports = { handleMenuClick };
}

// This code exports functions to script.test.js for testing.
module.exports = { handleMenuClick };

