
/**
 * @jest-environment jsdom
 */
//The above comment tells Jest to use the jsdom environment, which creates a fake browser environment for testing DOM manipulation and events.

//The below code imports the functions from script.js for testing.
const { handleMenuClick } = require("./script");

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
