document.addEventListener("DOMContentLoaded", () => {
  const numBubbles = 6;
  let score = localStorage.getItem("bubbleScore") ? parseInt(localStorage.getItem("bubbleScore")) : 0;
  let bubbleColor = localStorage.getItem("bubbleColor") || "#8EFFFF";
  let purchasedColors = JSON.parse(localStorage.getItem("purchasedColors")) || [];

  let colorOptions = [
      { name: "Default (cyan)", hex: "#8EFFFF", price: 0 },
      { name: "Red", hex: "#FF0000", price: 10 },
      { name: "Orange", hex: "#FFA500", price: 15 },
      { name: "Green", hex: "#00FF00", price: 20 },
      { name: "Blue", hex: "#0000FF", price: 25 },
      { name: "Rainbow", hex: "rainbow", price: 200 }
  ];

  let scoreDisplay = document.createElement("div");
  scoreDisplay.id = "scoreDisplay";
  scoreDisplay.style.position = "absolute";
  scoreDisplay.style.top = "20px";
  scoreDisplay.style.left = "20px";
  scoreDisplay.style.fontSize = "15px";
  scoreDisplay.style.background = "rgba(62, 62, 62, 0.34)";
  scoreDisplay.style.color = "color: var(--text-color);";
  scoreDisplay.style.padding = "10px 15px";
  scoreDisplay.style.fontFamily = "Montserrat, sans-serif";
  scoreDisplay.style.borderRadius = "5px";
  scoreDisplay.style.userSelect = "none";
  document.body.appendChild(scoreDisplay);

  function updateScoreDisplay() {
      scoreDisplay.textContent = `Score: ${score}`;
  }

  function updateScore() {
      score++;
      localStorage.setItem("bubbleScore", score);
      updateScoreDisplay();
  }

  function createBubble() {
      const bubble = document.createElement("div");
      bubble.classList.add("bubble");

      const x = Math.random() * window.innerWidth;
      const y = Math.random() * (window.innerHeight * 2);
      bubble.style.left = `${x}px`;
      bubble.style.top = `${y}px`;
      bubble.style.width = "30px";
      bubble.style.height = "30px";
      bubble.style.position = "absolute";
      bubble.style.borderRadius = "50%";
      bubble.style.backgroundColor = "transparent";

      if (bubbleColor === "rainbow") {
          bubble.style.animation = "rainbowOutline 2s linear infinite";
      } else {
          bubble.style.border = `2px solid ${bubbleColor}`;
      }

      bubble.addEventListener("click", () => {
          const angle = Math.random() * 360;
          const distance = Math.max(window.innerWidth, window.innerHeight);

          const deltaX = Math.cos(angle) * distance;
          const deltaY = Math.sin(angle) * distance;

          bubble.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
          bubble.style.opacity = "0";

          updateScore();

          setTimeout(() => {
              bubble.remove();
              createBubble();
          }, 1000);
      });

      document.body.appendChild(bubble);
  }

  for (let i = 0; i < numBubbles; i++) {
      createBubble();
  }

  updateScoreDisplay();

  const colorMenu = document.createElement("div");
  colorMenu.style.position = "absolute";
  colorMenu.style.top = "70px";
  colorMenu.style.left = "20px";
  colorMenu.style.padding = "10px 15px";
  colorMenu.style.borderRadius = "5px";
  colorMenu.style.display = "none";
  colorMenu.style.fontFamily = "Montserrat, sans-serif";
  colorMenu.style.color = "#fff";
  colorMenu.style.fontSize = "14px";
  colorMenu.style.zIndex = 1000;
  colorMenu.style.background = "rgba(62, 62, 62, 0.34)";
  colorMenu.style.textAlign = "left";
  colorMenu.style.width = "200px";

  function renderColorOptions() {
      colorMenu.innerHTML = "";

      colorOptions.forEach(({ name, hex, price }) => {
          const colorButton = document.createElement("button");
          colorButton.style.marginBottom = "10px";
          colorButton.style.padding = "5px 10px";
          colorButton.style.backgroundColor = "#333";
          colorButton.style.border = "none";
          colorButton.style.cursor = "pointer";
          colorButton.style.borderRadius = "5px";
          colorButton.style.color = "#fff";
          colorButton.style.width = "100%";

          if (hex === "#FFFFFF" || purchasedColors.includes(hex)) {
              colorButton.textContent = bubbleColor === hex ? `${name} (Equipped)` : `${name} (Click to equip)`;
          } else {
              colorButton.textContent = `${name} (Cost: ${price} points)`;
          }

          colorButton.addEventListener("click", () => {
              if (hex === "#FFFFFF" || purchasedColors.includes(hex)) {
                  bubbleColor = hex;
                  localStorage.setItem("bubbleColor", bubbleColor);
              } else if (score >= price) {
                  score -= price;
                  purchasedColors.push(hex);
                  bubbleColor = hex;
                  localStorage.setItem("bubbleScore", score);
                  localStorage.setItem("bubbleColor", bubbleColor);
                  localStorage.setItem("purchasedColors", JSON.stringify(purchasedColors));
                  updateScoreDisplay();
              } else {
                  showCustomAlert("Not enough points to buy this color.");
                  return;
              }
              renderColorOptions();
          });

          colorMenu.appendChild(colorButton);
      });
  }

  document.body.appendChild(colorMenu);

  let menuVisible = false;
  scoreDisplay.addEventListener("click", () => {
      menuVisible = !menuVisible;
      colorMenu.style.display = menuVisible ? "block" : "none";
      renderColorOptions();
  });

  function showCustomAlert(message) {
      const alertBox = document.createElement("div");
      alertBox.style.position = "fixed";
      alertBox.style.top = "50%";
      alertBox.style.left = "50%";
      alertBox.style.transform = "translate(-50%, -50%)";
      alertBox.style.backgroundColor = "rgba(50, 50, 50, 0.9)";
      alertBox.style.color = "#fff";
      alertBox.style.padding = "20px";
      alertBox.style.borderRadius = "8px";
      alertBox.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
      alertBox.style.fontFamily = "Montserrat, sans-serif";
      alertBox.style.zIndex = "10";
      alertBox.style.textAlign = "center";

      alertBox.textContent = message;

      const closeButton = document.createElement("button");
      closeButton.textContent = "Close";
      closeButton.style.marginTop = "15px";
      closeButton.style.padding = "5px 10px";
      closeButton.style.backgroundColor = "#ff4d4d";
      closeButton.style.border = "none";
      closeButton.style.cursor = "pointer";
      closeButton.style.borderRadius = "5px";
      closeButton.style.color = "#fff";

      closeButton.addEventListener("click", () => {
          alertBox.remove();
      });

      alertBox.appendChild(closeButton);
      document.body.appendChild(alertBox);
  }

  const style = document.createElement("style");
  style.innerHTML = `
      @keyframes rainbowOutline {
          0% { border-color: red; }
          20% { border-color: orange; }
          40% { border-color: yellow; }
          60% { border-color: green; }
          80% { border-color: blue; }
          100% { border-color: violet; }
      }
  `;
  document.head.appendChild(style);
});
