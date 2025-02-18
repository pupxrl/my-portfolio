document.addEventListener("DOMContentLoaded", () => {
    const numBubbles = 6;
    let score = localStorage.getItem("bubbleScore") ? parseInt(localStorage.getItem("bubbleScore")) : 0;
    let bubbleColor = localStorage.getItem("bubbleColor") || "lightblue"; 
    let purchasedColors = JSON.parse(localStorage.getItem("purchasedColors")) || [];

    let colorPrices = {
        "red": 10,
        "green": 15,
        "yellow": 20,
        "blue": 25
    };

    let scoreDisplay;
    if (score >= 1) {
        scoreDisplay = document.createElement("div");
        scoreDisplay.id = "scoreDisplay";
        scoreDisplay.style.position = "fixed";
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
        const y = Math.random() * window.innerHeight;
        bubble.style.left = `${x}px`;
        bubble.style.top = `${y}px`;
        bubble.style.backgroundColor = "transparent";
        bubble.style.border = `2px solid ${bubbleColor}`;
        bubble.style.borderRadius = "50%";

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
    colorMenu.style.position = "fixed";
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

    Object.keys(colorPrices).forEach((color) => {
        const colorButton = document.createElement("button");
        colorButton.textContent = purchasedColors.includes(color) 
            ? `${color.charAt(0).toUpperCase() + color.slice(1)} (Click to equip)`
            : `${color.charAt(0).toUpperCase() + color.slice(1)} (Cost: ${colorPrices[color]} points)`;

        colorButton.style.marginBottom = "10px";
        colorButton.style.padding = "5px 10px";
        colorButton.style.backgroundColor = "gray";
        colorButton.style.border = "none";
        colorButton.style.cursor = "pointer";
        colorButton.style.borderRadius = "5px";
        colorButton.style.color = "#fff";
        colorButton.style.width = "100%";

        colorButton.addEventListener("click", () => {
            if (!purchasedColors.includes(color)) {
                if (score >= colorPrices[color]) {
                    score -= colorPrices[color];
                    purchasedColors.push(color);
                    bubbleColor = color;
                    localStorage.setItem("bubbleScore", score); 
                    localStorage.setItem("bubbleColor", bubbleColor); 
                    localStorage.setItem("purchasedColors", JSON.stringify(purchasedColors)); 
                    updateScoreDisplay();
        
                    colorButton.textContent = `${color.charAt(0).toUpperCase() + color.slice(1)} (Click to equip)`;
                    colorButton.style.backgroundColor = "gray";  
                    colorMenu.style.display = "none";
                } else {
                    showCustomAlert("Not enough points to buy this color.<br>");
                }
            } else {
                bubbleColor = color; 
                localStorage.setItem("bubbleColor", bubbleColor); 
                showColorEquippedPopup(color); 
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
        const popup = document.createElement("div");
        popup.style.position = "fixed";
        popup.style.top = "50%";
        popup.style.left = "50%";
        popup.style.transform = "translate(-50%, -50%)";
        popup.style.backgroundColor = "rgba(50, 50, 50, 0.9)";
        popup.style.color = "#fff";
        popup.style.padding = "20px";
        popup.style.borderRadius = "8px";
        popup.style.fontFamily = "Montserrat, sans-serif";
        popup.style.zIndex = "10000";
        popup.style.textAlign = "center"; 
        popup.innerHTML = `${color.charAt(0).toUpperCase() + color.slice(1)} color equipped!`;

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
            popup.remove();
        });

        popup.appendChild(closeButton);
        document.body.appendChild(popup);
    }
});