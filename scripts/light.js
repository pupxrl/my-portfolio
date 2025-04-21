const themeToggle = document.getElementById("theme-toggle");
const themeStyle = document.getElementById("theme-style");

let currentTheme = localStorage.getItem("theme") || "light";
themeStyle.href = `../styles/${currentTheme}.css`;

themeToggle.addEventListener("click", () => {
  currentTheme = currentTheme === "light" ? "dark" : "light";
  themeStyle.href = `../styles/${currentTheme}.css`;
  localStorage.setItem("theme", currentTheme);
});
