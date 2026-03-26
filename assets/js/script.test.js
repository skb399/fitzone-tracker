
/**
 * @jest-environment jsdom
 */
//The above comment tells Jest to use the jsdom environment, which creates a fake browser environment for testing DOM manipulation and events.

//The below code imports the functions from script.js for testing.
const { handleMenuClick, getWorkoutPlans, workoutPlans, displayWorkoutPlan, workoutPlansEventListeners } = require("./script");

//MENU BUTTON TESTS
// These tests check that the handleMenuClick function shows the correct section and hides the menu section when a menu button is clicked.

test("handleMenuClick hides the menu when workout plans button is clicked", () => {
    // I created a fake DOM structure for the test as it wasn't working with the actual HTML file. 
    // This allows me to test the function in isolation.
    document.body.innerHTML = `
        <div id="menu-section"></div>
        <div id="workout-plans-section" class="d-none"></div>
    `;

    // Act: call the function
    handleMenuClick("workout-plans");

    // Assert: section is now hidden (d-none class added)
    const menuSection = document.getElementById("menu-section");
    expect(menuSection.classList.contains("d-none")).toBe(true);
})

test("handleMenuClick shows workout plans section", () => {
    // I created a fake DOM structure for the test as it wasn't working with the actual HTML file. 
    // This allows me to test the function in isolation.
    document.body.innerHTML = `
        <div id="menu-section"></div>
        <div id="workout-plans-section" class="d-none"></div>
    `;

    // Act: call the function
    handleMenuClick("workout-plans");

    // Assert: section is now visible (d-none class removed)
    const section = document.getElementById("workout-plans-section");
    expect(section.classList.contains("d-none")).toBe(false);
})

test("handleMenuClick shows record workout section", () => {
    // I created a fake DOM structure for the test as it wasn't working with the actual HTML file. 
    // This allows me to test the function in isolation.
    document.body.innerHTML = `
        <div id="menu-section"></div>
        <div id="record-workout-section" class="d-none"></div>
    `;

    // Act: call the function
    handleMenuClick("record-workout");

    // Assert: section is now visible (d-none class removed)
    const section = document.getElementById("record-workout-section");
    expect(section.classList.contains("d-none")).toBe(false);
})

test("handleMenuClick shows workout tips section", () => {
    // I created a fake DOM structure for the test as it wasn't working with the actual HTML file. 
    // This allows me to test the function in isolation.
    document.body.innerHTML = `
        <div id="menu-section"></div>
        <div id="workout-tips-section" class="d-none"></div>
    `;

    // Act: call the function
    handleMenuClick("workout-tips");

    // Assert: section is now visible (d-none class removed)
    const section = document.getElementById("workout-tips-section");
    expect(section.classList.contains("d-none")).toBe(false);
})

//WORKOUT PLANS SECTION TESTS

// this test checks if the getWorkoutPlans function returns the correct workout plan for the "push" workout type
test("returns push workout plan when type is push", () => {
    //Calls the function
    const result = getWorkoutPlans("push");
    //Expected result
    expect(result).toEqual(workoutPlans.push);
});

// this test checks if the getWorkoutPlans function returns the correct workout plan for the "pull" workout type
test("returns pull workout plan when type is pull", () => {
    const result = getWorkoutPlans("pull");
    expect(result).toEqual(workoutPlans.pull);
});

// this test checks if the getWorkoutPlans function returns the correct workout plan for the "legs" workout type
test("returns legs workout plan when type is legs", () => {
    const result = getWorkoutPlans("legs");
    expect(result).toEqual(workoutPlans.legs);
});

// this test checks if the getWorkoutPlans function returns an empty array when an invalid workout type is provided
test("returns empty array when workout type is invalid", () => {
    const result = getWorkoutPlans("cardio");
    expect(result).toEqual([]);
});

// this test checks if the displayWorkoutPlan function updates the workout-plan-display div with the data from the push workout plan
test("updates the workout-plan-display div with the push plan when push is detected", () => {
    // Created fake DOM structure for the test as it wasn't working with the actual HTML file.
    document.body.innerHTML = `
    <div id="workout-plan-display"> </div>
    `;

    // Act: call the function with "push" 
    displayWorkoutPlan("push");
    const display = document.getElementById("workout-plan-display");

    // Assert: the content of the display should contain the first exercise in the push workout plan
    expect(display.textContent).toContain("Bench Press");

});

// this test checks if the displayWorkoutPlan handles invalid type
test("updates the workout-plan-display with error message when handling invalid type", () => {
    // Created fake DOM structure for the test as it wasn't working with the actual HTML file.
    document.body.innerHTML = `
    <div id="workout-plan-display"> </div>
    `;

    // Act: call the function with "abs" 
    displayWorkoutPlan("abs");
    const display = document.getElementById("workout-plan-display");

    // Assert: the content of the display should contain the error message
    expect(display.textContent).toBe("No workout found");


});

// this test checks if clicking the push workout button displays the push workout plan in the workout plan display
test("clicking push button displays push workout", () => {
    // Created fake DOM structure for the test as it wasn't working with the actual HTML file.
    document.body.innerHTML = `
        <button id="push-workout-btn">Push</button>
        <div id="workout-plan-display"></div>
    `;
    // Call the function to set up the event listener for the push button
    workoutPlansEventListeners();

    // Act: click push button
    document.getElementById("push-workout-btn").click();

    // Assert "Bench Press" is shown in the workout plan display
    const display = document.getElementById("workout-plan-display");
    expect(display.innerHTML).toContain("Bench Press");
});

// this test checks if clicking the pull workout button displays the pull workout plan in the workout plan display
test("clicking pull button displays pull workout", () => {
    // Created fake DOM structure for the test as it wasn't working with the actual HTML file.
    document.body.innerHTML = `
        <button id="pull-workout-btn">Pull</button>
        <div id="workout-plan-display"></div>
    `;
    // Call the function to set up the event listener for the pull button
    workoutPlansEventListeners();

    // Act: click pull button
    document.getElementById("pull-workout-btn").click();

    // Assert "Deadlift" is shown in the workout plan display
    const display = document.getElementById("workout-plan-display");
    expect(display.innerHTML).toContain("Deadlift");
});

// this test checks if clicking the legs workout button displays the legs workout plan in the workout plan display
test("clicking legs button displays legs workout", () => {
    // Created fake DOM structure for the test as it wasn't working with the actual HTML file.
    document.body.innerHTML = `
        <button id="legs-workout-btn">Legs</button>
        <div id="workout-plan-display"></div>
    `;
    // Call the function to set up the event listener for the legs button
    workoutPlansEventListeners();

    // Act: click legs button
    document.getElementById("legs-workout-btn").click();

    // Assert "Squats" is shown in the workout plan display
    const display = document.getElementById("workout-plan-display");
    expect(display.innerHTML).toContain("Squats");
});
