const themeToggle = document.getElementById("theme-toggle");
const themeStyle = document.getElementById("theme-style");

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  themeStyle.href = `../styles/${savedTheme}.css`;
}

themeToggle.addEventListener("click", () => {
  if (themeStyle.href.includes("light.css")) {
    themeStyle.href = "../styles/dark.css";
    localStorage.setItem("theme", "dark");
  } else {
    themeStyle.href = "../styles/light.css";
    localStorage.setItem("theme", "light");
  }
});
