// // Function to toggle dark mode
// function toggleDarkMode() {
//     console.log('Toggle dark mode function called');
//     var html = document.documentElement;
//     var toggleLabel = document.getElementById("toggle-label");

//     // Toggle the "dark" class on the html element
//     html.classList.toggle("dark");

//     // Update the button label text
//     if (html.classList.contains("dark")) {
//         toggleLabel.textContent = "Light Mode";
//         // Store the current mode in local storage or cookies
//         localStorage.setItem("adminDarkMode", "enabled");
//     } else {
//         toggleLabel.textContent = "Dark Mode";
//         // Store the current mode in local storage or cookies
//         localStorage.setItem("adminDarkMode", "disabled");
//     }
// }

// // Check for the current mode in local storage
// var currentMode = localStorage.getItem("adminDarkMode");

// // Set the initial mode based on local storage
// if (currentMode === "enabled") {
//     toggleDarkMode();
// }

// // Get the dark mode toggle button by its ID
// var darkModeToggle = document.getElementById("dark-mode-toggle");

// // Add a click event listener to the button
// darkModeToggle.addEventListener("click", toggleDarkMode);


// Function to toggle dark mode
document.addEventListener("DOMContentLoaded", function () {
    function toggleDarkMode() {
        var html = document.documentElement;
        var darkIcon = document.getElementById("dark-icon");
        var lightIcon = document.getElementById("light-icon");

        // Toggle the "dark" class on the html element
        html.classList.toggle("dark");

        // Toggle the display style of moon and sun icons
        darkIcon.style.display = html.classList.contains("dark") ? "none" : "block";
        lightIcon.style.display = html.classList.contains("dark") ? "block" : "none";

        // Store the current mode in local storage or cookies
        localStorage.setItem("adminDarkMode", html.classList.contains("dark") ? "enabled" : "disabled");
    }

    // Check for the current mode in local storage
    var currentMode = localStorage.getItem("adminDarkMode");

    // Set the initial mode based on local storage
    if (currentMode === "enabled") {
        toggleDarkMode();
    } else if (currentMode === "disabled") {
        // Optionally, you can add logic here to disable dark mode if needed
    }

    // Get the dark mode toggle button by its ID
    var darkModeToggle = document.getElementById("dark-mode-toggle");

    // Add a click event listener to the button
    darkModeToggle.addEventListener("click", toggleDarkMode);
});
