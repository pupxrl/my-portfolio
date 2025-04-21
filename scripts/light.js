try {
  const themeToggle = document.getElementById("theme-toggle");
  const themeStyle = document.getElementById("theme-style");

  if (!themeToggle || !themeStyle) {
    throw new Error("Required DOM elements not found: #theme-toggle or #theme-style");
  }

  const themes = {
    light: "../styles/light.css",
    dark: "../styles/dark.css",
  };

  let savedTheme = localStorage.getItem("theme");
  if (!themes[savedTheme]) {
    savedTheme = "light";
  }

  themeStyle.href = themes[savedTheme];

  themeToggle.addEventListener("click", () => {
    const isLight = themeStyle.href.includes("light.css");
    const newTheme = isLight ? "dark" : "light";

    themeStyle.href = themes[newTheme];
    localStorage.setItem("theme", newTheme);
  });
} catch (error) {
  console.error("Theme toggle failed:", error);
}