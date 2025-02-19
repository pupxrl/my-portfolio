document.addEventListener("DOMContentLoaded", () => {
    const numBubbles = 6;
    let score = localStorage.getItem("bubbleScore")
      ? parseInt(localStorage.getItem("bubbleScore"))
      : 0;
    let bubbleColor = localStorage.getItem("bubbleColor") || "#FFFFFF";
    let purchasedColors =
      JSON.parse(localStorage.getItem("purchasedColors")) || [];
  
    function hexToRgb(hex) {
      hex = hex.replace(/^#/, "");
      let bigint = parseInt(hex, 16);
      let r = (bigint >> 16) & 255;
      let g = (bigint >> 8) & 255;
      let b = bigint & 255;
      return `${r}, ${g}, ${b}`;
    }
  
    let colorOptions = [
      { name: "Red", hex: "#FF0000", price: 10 },
      { name: "Orange", hex: "#FFA500", price: 15 },
      { name: "Green", hex: "#00FF00", price: 20 },
      { name: "Blue", hex: "#0000FF", price: 25 },
    ];
  
    let scoreDisplay;
    if (score >= 1) {
      scoreDisplay = document.createElement("div");
      scoreDisplay.id = "scoreDisplay";
      scoreDisplay.style.position = "absolute";
      scoreDisplay.style.top = "20px";
      scoreDisplay.style.left = "20px";
      scoreDisplay.style.fontSize = "15px";
      scoreDisplay.style.background = "rgba(62, 62, 62, 0.34)";
      scoreDisplay.style.color = "rgba(255, 255, 255, 0.71)";
      scoreDisplay.style.padding = "10px 15px";
      scoreDisplay.style.fontFamily = "Montserrat, sans-serif";
      scoreDisplay.style.borderRadius = "5px";
      scoreDisplay.style.userSelect = "none";
      document.body.appendChild(scoreDisplay);
    }
  
    function updateScoreDisplay() {
      if (scoreDisplay) {
        scoreDisplay.textContent = `Score: ${score}`;
      }
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
      bubble.style.border = `1px solid rgba(${hexToRgb(bubbleColor)}, 0.5)`;
      bubble.style.borderRadius = "50%";
      bubble.style.backdropFilter = "blur(2px)";
      bubble.style.webkitBackdropFilter = "blur(2px)";
  
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
  
    const title = document.createElement("div");
    title.textContent = "Color Shop";
    title.style.fontSize = "16px";
    title.style.fontWeight = "bold";
    title.style.marginBottom = "10px";
    colorMenu.appendChild(title);
  
    colorOptions.forEach(({ name, hex, price }) => {
      const colorButton = document.createElement("button");
      colorButton.textContent = purchasedColors.includes(hex)
        ? `${name} (Click to equip)`
        : `${name} (Cost: ${price} points)`;
  
      colorButton.style.marginBottom = "10px";
      colorButton.style.padding = "5px 10px";
      colorButton.style.backgroundColor = hex;
      colorButton.style.border = "none";
      colorButton.style.cursor = "pointer";
      colorButton.style.borderRadius = "5px";
      colorButton.style.color = "#fff";
      colorButton.style.width = "100%";
  
      colorButton.addEventListener("click", () => {
        if (!purchasedColors.includes(hex)) {
          if (score >= price) {
            score -= price;
            purchasedColors.push(hex);
            bubbleColor = hex;
            localStorage.setItem("bubbleScore", score);
            localStorage.setItem("bubbleColor", bubbleColor);
            localStorage.setItem("purchasedColors", JSON.stringify(purchasedColors));
            updateScoreDisplay();
  
            colorButton.textContent = `${name} (Click to equip)`;
            colorMenu.style.display = "none";
          } else {
            showCustomAlert("Not enough points to buy this color.<br>");
          }
        } else {
          bubbleColor = hex;
          localStorage.setItem("bubbleColor", bubbleColor);
          showColorEquippedPopup(name);
          colorMenu.style.display = "none";
        }
      });
  
      colorMenu.appendChild(colorButton);
    });
  
    document.body.appendChild(colorMenu);
  
    let menuVisible = false;
    scoreDisplay.addEventListener("click", () => {
      menuVisible = !menuVisible;
      colorMenu.style.display = menuVisible ? "block" : "none";
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
  
      alertBox.innerHTML = message;
  
      const closeButton = document.createElement("button");
      closeButton.textContent = "Close";
      closeButton.style.marginTop = "15px";
      closeButton.style.padding = "5px 10px";
      closeButton.style.backgroundColor = "#ff4d4d";
      closeButton.style.border = "none";
      closeButton.style.cursor = "pointer";
      closeButton.style.borderRadius = "5px";
      closeButton.style.color = "#fff";
      closeButton.style.display = "block";
      closeButton.style.margin = "10px auto";
  
      closeButton.addEventListener("click", () => {
        alertBox.remove();
      });
  
      alertBox.appendChild(closeButton);
      document.body.appendChild(alertBox);
    }
  
    function showColorEquippedPopup(color) {
      showCustomAlert(`${color} color equipped!`);
    }
  });
  