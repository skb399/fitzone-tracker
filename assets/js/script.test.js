
/**
 * @jest-environment jsdom
 */
//The above comment tells Jest to use the jsdom environment, which creates a fake browser environment for testing DOM manipulation and events.

//The below code imports the functions from script.js for testing.
const { handleMenuClick, getWorkoutPlans, workoutPlans, displayWorkoutPlan, workoutPlansEventListeners, calculateVolume, getPerformanceFeedback, processWorkoutInput, displayWorkoutResults, handleWorkoutCalculation } = require("./script");

// Import the whole module as an object so jest.spyOn can watch functions on it
const script = require("./script");

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
        <section id="menu-section" class=""></section>
        <section id="workout-plans-section" class=""></section>
        <section id="record-workout-section" class=""></section>
        <section id="workout-tips-section" class="d-none"></section>
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

//WORKOUT PLANS SECTION EVENT LISTENERS

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

// MENU BUTTONS TESTS

// handleMenuClick tests - this function is responsible for showing the correct section and hiding the menu section when a menu button is clicked, so I will test that 
// it correctly shows and hides the appropriate sections when different menu buttons are clicked to ensure that the navigation between sections of the app is working.

test("Clicking return to menu button shows menu section", () => {
    // I created a fake DOM structure for the test as it wasn't working with the actual HTML file. 
    // This allows me to test the function in isolation.
    document.body.innerHTML = `
        <div id="menu-section" class="d-none"></div>
<div id="workout-plans-section"></div>
<button id="workout-plans-back-btn"></button>
    `;

    // Act: call the function to simulate clicking the return to menu button 
    handleMenuClick("return-menu-from-workout-plans");

    // Assert: menu section should now be visible and workout plans section should be hidden
    const menu = document.getElementById("menu-section");
    const plans = document.getElementById("workout-plans-section");

    // Expecting - the menu should now be visible (d-none class removed) and the workout plans section should be hidden (d-none class added)
    expect(menu.classList.contains("d-none")).toBe(false);
    expect(plans.classList.contains("d-none")).toBe(true);
})

test("Clicking record workout button on workout plans section shows record workout section", () => {
    // I created a fake DOM structure for the test as it wasn't working with the actual HTML file. 
    // This allows me to test the function in isolation.
    document.body.innerHTML = `
       <div id="workout-plans-section"></div>
        <div id="record-workout-section" class="d-none"></div>
        <button id="workout-plans-record-btn"></button>
    `;

    // Act: call the function to simulate clicking the record workout button 
    handleMenuClick("record-workout");

    // Assert: workout plans section should now be hidden and record workout section should be visible
    const plans = document.getElementById("workout-plans-section");
    const record = document.getElementById("record-workout-section");

    // Expecting - the workout plans section should be hidden (d-none class added) and the record workout section should be visible (d-none class removed)
    expect(plans.classList.contains("d-none")).toBe(true);
    expect(record.classList.contains("d-none")).toBe(false);
})

// PERFORMANCE FEEDBACK TESTS

// calculateVolume tests - this function calculates the total volume of a workout based on the sets, reps, and weight input by the user, which is used to provide 
// performance feedback to the user. I will test that it correctly calculates the volume for different inputs to ensure that the performance feedback is based on 
// accurate calculations.

test("calculateVolume function correctly calculates volume for performance feedback to user", () => {
    // Fake DOM not needed as i'm testing pure math/logic, not how the function interacts with the DOM.


    // Act: call the function to simulate entering sets, reps, and weight and calculating volume
    const sets = 5;
    const reps = 10;
    const weight = 20;
    const result = calculateVolume(sets, reps, weight);

    // Assert: calculated volume should be correct (sets x reps x weight)
    expect(result).toBe(1000); // Example expected volume for 5 sets, 10 reps, and 20 weight

})

// getPerformanceFeedback tests - this function provides feedback based on the total volume of a workout, so I will test that it returns the correct 
// feedback for different volume levels (low, moderate, high) to ensure that the feedback logic is working providing eedback to the user based on their workout performance.

test("getPerformanceFeedback function returns low effort feedback when volume is below threshold", () => {
    // Fake DOM not needed as i'm testing pure logic, not how the function interacts with the DOM.

    // Act: call the function to simulate calculating performance feedback for a low volume
    const result = getPerformanceFeedback(100);

    // Assert: feedback should indicate low effort
    expect(result).toBe("Low effort");
});

test("getPerformanceFeedback function returns moderate effort feedback when volume is below threshold", () => {
    // Fake DOM not needed as i'm testing pure logic, not how the function interacts with the DOM.

    // Act: call the function to simulate calculating performance feedback for a moderate volume
    const result = getPerformanceFeedback(1200);

    // Assert: feedback should indicate moderate effort
    expect(result).toBe("Moderate effort");
});

test("getPerformanceFeedback function returns high effort feedback when volume is above threshold", () => {
    // Fake DOM not needed as i'm testing pure logic, not how the function interacts with the DOM.

    // Act: call the function to simulate calculating performance feedback for a high volume
    const result = getPerformanceFeedback(3500);

    // Assert: feedback should indicate high effort
    expect(result).toBe("High effort");
});

// processWorkoutInput tests - this function combines the calculateVolume and getPerformanceFeedback functions to process the workout input and return both the 
// calculated volume and feedback in an object, which can be used to update the DOM with the performance feedback for the user.

test("processWorkoutInput returns correct volume and feedback", () => {
    // Fake DOM not needed as i'm testing pure logic, not how the function interacts with the DOM.

    // Act: call the function to simulate calculating performance feedback for a high volume
    // This should calculate a volume of 1000 and return "Moderate effort"
    const result = processWorkoutInput(5, 10, 20);

    // Assert: both volume and feedback should indicate moderate effort
    expect(result.volume).toBe(1000);
    expect(result.feedback).toBe("Moderate effort");
});

test("processWorkoutInput returns high effort feedback for high volume", () => {
    // Fake DOM not needed as i'm testing pure logic, not how the function interacts with the DOM.

    // Act: call the function to simulate calculating performance feedback for a high volume
    // This should calculate a volume of 3000 and return "High effort"
    const result = processWorkoutInput(10, 10, 30);

    // Assert: both volume and feedback should indicate high effort
    expect(result.volume).toBe(3000);
    expect(result.feedback).toBe("High effort");
});

test("processWorkoutInput returns low effort feedback for low volume", () => {
    // Fake DOM not needed as i'm testing pure logic, not how the function interacts with the DOM.

    // Act: call the function to simulate calculating performance feedback for a low volume
    // This should calculate a volume of 100 and return "Low effort"
    const result = processWorkoutInput(1, 10, 10);

    // Assert: both volume and feedback should indicate low effort
    expect(result.volume).toBe(100);
    expect(result.feedback).toBe("Low effort");
});


test("processWorkoutInput returns an error for empty input", () => {
    // Fake DOM not needed as i'm testing pure logic, not how the function interacts with the DOM.

    // Act: call the function to simulate calculating performance feedback with empty input
    // This should return a volume of 0 and an error message in the feedback
    const result = processWorkoutInput("", 10, 20);

    // Assert: volume should be 0 and feedback should indicate an error
    expect(result.volume).toBe(0);
    expect(result.feedback).toBe("Please enter valid numbers");
});

test("processWorkoutInput returns error for negative input", () => {
    // Fake DOM not needed as i'm testing pure logic, not how the function interacts with the DOM.

    // Act: call the function to simulate calculating performance feedback with negative input
    // This should return a volume of 0 and an error message in the feedback because negative values are invalid for sets, reps, and weight
    const result = processWorkoutInput(-1, 10, 20);

    // Assert: volume should be 0 and feedback should indicate an error
    expect(result.volume).toBe(0);
    expect(result.feedback).toBe("Please enter valid numbers");
});

test("processWorkoutInput returns error for text input", () => {
    // Fake DOM not needed as i'm testing pure logic, not how the function interacts with the DOM.

    // Act: call the function to simulate calculating performance feedback with text input
    // This should return a volume of 0 and an error message in the feedback because text values are invalid for sets, reps, and weight
    const result = processWorkoutInput("abc", 10, 20);

    // Assert: volume should be 0 and feedback should indicate an error
    expect(result.volume).toBe(0);
    expect(result.feedback).toBe("Please enter valid numbers");
});

//RESULTS SECTION TESTS

test("displayWorkoutResults shows results section and updates result fields", () => {
    // I created a fake DOM structure for the test as it wasn't working with the actual HTML file. 
    // This allows me to test the function in isolation.
    document.body.innerHTML = `
        <section id="record-workout-section"></section>
        <section id="results-section" class="d-none"></section>
        <span id="result-exercise">-</span>
        <span id="volume-output">0</span>
        <span id="performance-output">-</span>
        <div id="feedback-message">Your workout feedback will appear here.</div>
        <img id="feedback-image" class="d-none" src="" alt="Workout performance feedback">
    // `;
    // Act: call the function to simulate displaying workout results with a sample exercise, volume, and feedback
    displayWorkoutResults("Bench Press", {
        volume: 1000,
        feedback: "Moderate effort"
    });

    // Assert: results section should be visible and result fields should be updated with the provided data
    // Expecting - the results section should be visible (d-none class removed), the record workout section should be hidden 
    // (d-none class added), and the result fields should be updated with the correct values
    expect(document.getElementById("results-section").classList.contains("d-none")).toBe(false);
    expect(document.getElementById("record-workout-section").classList.contains("d-none")).toBe(true);
    expect(document.getElementById("result-exercise").textContent).toBe("Bench Press");
    expect(document.getElementById("volume-output").textContent).toBe("1000");
    expect(document.getElementById("performance-output").textContent).toBe("Moderate effort");
    expect(document.getElementById("feedback-message").textContent).toBe("Moderate effort");
});

test("displayWorkoutResults updates and shows the feedback image", () => {
    // I created a fake DOM structure for the test as it wasn't working with the actual HTML file. 
    // This allows me to test the function in isolation.
    document.body.innerHTML = `
        <section id="record-workout-section"></section>
        <section id="results-section" class="d-none"></section>
        <span id="result-exercise">-</span>
        <span id="volume-output">0</span>
        <span id="performance-output">-</span>
        <div id="feedback-message">Your workout feedback will appear here.</div>
        <img id="feedback-image" class="d-none" src="" alt="Workout performance feedback">
    `;

    // Act: call the function to simulate displaying workout results with a sample exercise, volume, and feedback 
    // that should trigger the moderate effort feedback and show the correct image
    displayWorkoutResults("Bench Press", {
        volume: 1000,
        feedback: "Moderate effort"
    });

    // Assert: feedback image should be updated with the correct src
    const image = document.getElementById("feedback-image");

    // Expecting - the feedback image should now be visible (d-none class removed) and the src should contain "moderate-effort" based on the feedback provided
    expect(image.classList.contains("d-none")).toBe(false);
    expect(image.getAttribute("src")).toContain("moderate-effort");
});

test("handleWorkoutCalculation processes inputs and displays workout results", () => {
    // I created a fake DOM structure for the test as it wasn't working with the actual HTML file. 
    // This allows me to test the function in isolation.
    document.body.innerHTML = `
        <section id="record-workout-section">
            <input id="exercise-name" value="Bench Press">
            <input id="sets" value="3">
            <input id="reps" value="10">
            <input id="weight" value="50">
        </section>

        <section id="results-section" class="d-none">
            <span id="result-exercise">-</span>
            <span id="volume-output">0</span>
            <span id="performance-output">-</span>
            <div id="feedback-message">Your workout feedback will appear here.</div>
            <img id="feedback-image" src="" class="d-none">
        </section>
    `;

    // Act: call the function to simulate processing workout input and displaying results
    handleWorkoutCalculation();

    // Assert: results section should be visible and result fields should be updated based on the input values (3 sets x 10 reps x 50 weight = 1500 volume, 
    // which should give "Moderate effort" feedback)
    expect(document.getElementById("result-exercise").textContent).toBe("Bench Press");
    expect(document.getElementById("volume-output").textContent).toBe("1500");
    expect(document.getElementById("performance-output").textContent).toBe("Moderate effort");
    expect(document.getElementById("results-section").classList.contains("d-none")).toBe(false);
});

test("handleMenuClick shows workout tips section and hides other sections", () => {
    // I created a fake DOM structure for the test as it wasn't working with the actual HTML file. 
    // This allows me to test the function in isolation.
    document.body.innerHTML = `
        <section id="menu-section" class=""></section>
        <section id="workout-plans-section" class=""></section>
        <section id="record-workout-section" class=""></section>
        <section id="workout-tips-section" class="d-none"></section>
    `;

    // Act: call the function to simulate clicking the workout tips button
    handleMenuClick("workout-tips");

    // Assert: workout tips section should be visible and other sections should be hidden
    const tipsSection = document.getElementById("workout-tips-section");
    expect(tipsSection.classList.contains("d-none")).toBe(false);

    // Assert: all other sections should be hidden (d-none class added)
    const menuSection = document.getElementById("menu-section");
    const workoutPlansSection = document.getElementById("workout-plans-section");
    const recordWorkoutSection = document.getElementById("record-workout-section");

    // Expect- the workout tips section should be visible (d-none class removed) and all other sections should be hidden (d-none class added)
    expect(menuSection.classList.contains("d-none")).toBe(true);
    expect(workoutPlansSection.classList.contains("d-none")).toBe(true);
    expect(recordWorkoutSection.classList.contains("d-none")).toBe(true);
});

test("displayWorkoutTip shows tip and reveals 'Get Another Tip' button", () => {
    // I created a fake DOM structure for the test as it wasn't working with the actual HTML file. 
    // This allows me to test the function in isolation.
    document.body.innerHTML = `
        <div id="tip-result-box">Click the button to get a workout tip.</div>
        <button id="get-another-tip-btn" class="d-none"></button>
    `;

    // Act: call the function to simulate displaying a workout tip
    displayWorkoutTip("Stay hydrated during your workout");

    // Assert: the tip result box should be updated with the provided workout tip
    const resultBox = document.getElementById("tip-result-box");
    expect(resultBox.textContent).toBe("Stay hydrated during your workout");

    // Assert: the "Get Another Tip" button should now be visible (d-none class removed) 
    // so the user can click it to get another tip if they want
    const anotherTipBtn = document.getElementById("get-another-tip-btn");
    expect(anotherTipBtn.classList.contains("d-none")).toBe(false);
});

