document.addEventListener("DOMContentLoaded", () => {
    const numBubbles = 6;

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
});