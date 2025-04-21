const themeToggle = document.getElementById("theme-toggle");
const themeStyle = document.getElementById("theme-style");

const themes = {
  light: "/styles/light.css",
  dark: "/styles/dark.css",
};

const savedTheme = localStorage.getItem("theme") || "light";
themeStyle.href = themes[savedTheme];

themeToggle.addEventListener("click", () => {
  const newTheme = themeStyle.href.includes("light.css") ? "dark" : "light";
  themeStyle.href = themes[newTheme];
  localStorage.setItem("theme", newTheme);
});