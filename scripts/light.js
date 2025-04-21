const themeToggle = document.getElementById("theme-toggle");
const themeStyle = document.getElementById("theme-style");

const themes = {
  light: "/styles/light.css",
  dark: "/styles/dark.css",
};

let savedTheme = localStorage.getItem("theme") || "light";

themeStyle.href = themes[savedTheme];

themeToggle.addEventListener("click", () => {
  const isLight = themeStyle.href.includes("light.css");
  const newTheme = isLight ? "dark" : "light";
  console.log(newTheme)

  themeStyle.href = themes[newTheme];

  localStorage.setItem("theme", newTheme);
});
