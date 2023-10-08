
// Function to toggle dark mode
function toggleDarkMode() {
    var html = document.documentElement;
    var toggleLabel = document.getElementById("toggle-label");
    var darkIcon = document.getElementById("dark-icon");
    var lightIcon = document.getElementById("light-icon");

    // Toggle the "dark" class on the html element
    html.classList.toggle("dark");

    // Toggle the visibility of moon and sun icons
    darkIcon.classList.toggle("hidden");
    lightIcon.classList.toggle("hidden");

    // Update the button label text
    if (html.classList.contains("dark")) {
        toggleLabel.textContent = "";
        // Store the current mode in local storage or cookies
        localStorage.setItem("darkMode", "enabled");
    } else {
        toggleLabel.textContent = "";
        // Store the current mode in local storage or cookies
        localStorage.setItem("darkMode", "disabled");
    }
}

// Check for the current mode in local storage
var currentMode = localStorage.getItem("darkMode");

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
