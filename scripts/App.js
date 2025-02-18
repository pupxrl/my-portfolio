document.addEventListener("DOMContentLoaded", () => {
    const numBubbles = 6;
    let score = localStorage.getItem("bubbleScore") ? parseInt(localStorage.getItem("bubbleScore")) : 0;

    // create score display only if score >= 1
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
        scoreDisplay.style.fontFamily = "Montserrat, sans-serif"
        scoreDisplay.style.borderRadius = "5px";
        document.body.appendChild(scoreDisplay);
    }

    // function to update score display without incrementing on refresh
    function updateScoreDisplay() {
        if (scoreDisplay) {
            scoreDisplay.textContent = `Score: ${score}`;
        }
    }

    function updateScore() {
        score++;
        localStorage.setItem("bubbleScore", score);
        if (score >= 1 && !scoreDisplay) {
            // Create and display score if the score is >= 1
            scoreDisplay = document.createElement("div");
            scoreDisplay.id = "scoreDisplay";
            scoreDisplay.style.position = "fixed";
            scoreDisplay.style.top = "20px";
            scoreDisplay.style.left = "20px";
            scoreDisplay.style.fontSize = "15px";
            scoreDisplay.style.background = "rgba(62, 62, 62, 0.34)";
            scoreDisplay.style.color = "rgba(255, 255, 255, 0.71)";
            scoreDisplay.style.padding = "10px 15px";
            scoreDisplay.style.fontFamily = "Montserrat, sans-serif"
            scoreDisplay.style.borderRadius = "5px";
            document.body.appendChild(scoreDisplay);
        }
        updateScoreDisplay();
    }

    function createBubble() {
        const bubble = document.createElement("div");
        bubble.classList.add("bubble");

        // randomise position
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        bubble.style.left = `${x}px`;
        bubble.style.top = `${y}px`;

        // click function to animate and remove bubble
        bubble.addEventListener("click", () => {
            const angle = Math.random() * 360;
            const distance = Math.max(window.innerWidth, window.innerHeight);

            const deltaX = Math.cos(angle) * distance;
            const deltaY = Math.sin(angle) * distance;

            bubble.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
            bubble.style.opacity = "0";

            updateScore();

            // remove element and create a new one
            setTimeout(() => {
                bubble.remove();
                createBubble();
            }, 1000);
        });

        document.body.appendChild(bubble);
    }

    // create initial bubbles
    for (let i = 0; i < numBubbles; i++) {
        createBubble();
    }

    // display the existing score without incrementing it
    updateScoreDisplay();
});
