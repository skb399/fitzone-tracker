// script.js


// This function handles the click events for the menu items and displays the corresponding sections while hiding the menu.
function handleMenuClick(sectionId) {
    if (sectionId === "workout-plans") {
        document.getElementById("workout-plans-section").classList.remove("hidden");
        document.getElementById("menu-section").classList.add("hidden");
    } else if (sectionId === "record-workout") {
        document.getElementById("record-workout-section").classList.remove("hidden");
        document.getElementById("menu-section").classList.add("hidden");
    } else if (sectionId === "workout-tips") {
        document.getElementById("workout-tips-section").classList.remove("hidden");
        document.getElementById("menu-section").classList.add("hidden");
    }
};






module.exports = { handleMenuClick };