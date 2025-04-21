const themeToggle = document.getElementById("theme-toggle");

const themes = {
  light: {
    '--bg-color': '#ffffff',
    '--text-color': '#000000',
    '--link-color': '#007bff',
    '--hover-color': '#cce5ff'
  },
  dark: {
    '--bg-color': '#121212',
    '--text-color': '#ffffff',
    '--link-color': '#66b3ff',
    '--hover-color': '#ffccf5',
    '--polar-color': '#000000'
  },
};

let savedTheme = localStorage.getItem("theme") || "light";

function applyTheme(theme) {
  const root = document.documentElement;
  const colors = themes[theme];

  for (let color in colors) {
    root.style.setProperty(color, colors[color]);
  }
}

applyTheme(savedTheme);

themeToggle.addEventListener("click", () => {
  const currentTheme = localStorage.getItem("theme") || "light";
  const newTheme = currentTheme === "light" ? "dark" : "light";
  
  applyTheme(newTheme);
  localStorage.setItem("theme", newTheme);
});
