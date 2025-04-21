// JavaScript for dynamic CSS handling
const themeToggle = document.getElementById("theme-toggle");

// Define the themes with colors (you can expand these if needed)
const themes = {
  light: {
    '--bg-color': '#ffffff',
    '--text-color': '#000000',
    '--link-color': '#007bff',
  },
  dark: {
    '--bg-color': '#121212',
    '--text-color': '#ffffff',
    '--link-color': '#66b3ff',
  },
};

// Retrieve the saved theme from localStorage (defaults to 'light' theme)
let savedTheme = localStorage.getItem("theme") || "light";

// Apply the saved theme by updating CSS variables
function applyTheme(theme) {
  const root = document.documentElement;
  const colors = themes[theme];

  for (let color in colors) {
    root.style.setProperty(color, colors[color]);
  }
}

// Set the theme on page load
applyTheme(savedTheme);

// Add an event listener to toggle between themes
themeToggle.addEventListener("click", () => {
  const currentTheme = localStorage.getItem("theme") || "light";
  const newTheme = currentTheme === "light" ? "dark" : "light";
  
  // Apply the new theme and save it to localStorage
  applyTheme(newTheme);
  localStorage.setItem("theme", newTheme);
});
