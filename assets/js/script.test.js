/**
 * @jest-environment jsdom
 */

const { handleMenuClick } = require("./script");

test("handleMenuClick hides the menu section", () => {
    // I created a fake DOM structure for the test as it wasn't working with the actual HTML file. 
    // This allows me to test the function in isolation.
    document.body.innerHTML = `
        <div id="menu-section"></div>
        <div id="workout-plans-section" class="hidden"></div>
    `;

    // Act: call the function
    handleMenuClick("workout-plans");

    // Assert: section is now hidden (hidden class added)
    const menuSection = document.getElementById("menu-section");
    expect(menuSection.classList.contains("hidden")).toBe(true);
});

test("handleMenuClick shows workout plans section", () => {
    // I created a fake DOM structure for the test as it wasn't working with the actual HTML file. 
    // This allows me to test the function in isolation.
    document.body.innerHTML = `
        <div id="menu-section"></div>
        <div id="workout-plans-section" class="hidden"></div>
    `;

    // Act: call the function
    handleMenuClick("workout-plans");

    // Assert: section is now visible (hidden class removed)
    const section = document.getElementById("workout-plans-section");
    expect(section.classList.contains("hidden")).toBe(false);
});

test("handleMenuClick shows record workout section", () => {
    // I created a fake DOM structure for the test as it wasn't working with the actual HTML file. 
    // This allows me to test the function in isolation.
    document.body.innerHTML = `
        <div id="menu-section"></div>
        <div id="record-workout-section" class="hidden"></div>
    `;

    // Act: call the function
    handleMenuClick("record-workout");

    // Assert: section is now visible (hidden class removed)
    const section = document.getElementById("record-workout-section");
    expect(section.classList.contains("hidden")).toBe(false);
});

test("handleMenuClick shows workout tips section", () => {
    // I created a fake DOM structure for the test as it wasn't working with the actual HTML file. 
    // This allows me to test the function in isolation.
    document.body.innerHTML = `
        <div id="menu-section"></div>
        <div id="workout-tips-section" class="hidden"></div>
    `;

    // Act: call the function
    handleMenuClick("workout-tips");

    // Assert: section is now visible (hidden class removed)
    const section = document.getElementById("workout-tips-section");
    expect(section.classList.contains("hidden")).toBe(false);
});



