const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const flowersContainer = document.getElementById("flowers");

// Position NO initially
let noX = 60;
let noY = 20;
noBtn.style.left = `${noX}%`;
noBtn.style.top = `${noY}px`;

// Make NO escape mouse AND keyboard
function moveNoButton() {
  noX = Math.random() * 80;
  noY = Math.random() * 80;

  noBtn.style.left = `${noX}%`;
  noBtn.style.top = `${noY}px`;
}

// Mouse hover escape
document.addEventListener("mousemove", (e) => {
  const rect = noBtn.getBoundingClientRect();
  const distance = Math.hypot(
    e.clientX - (rect.left + rect.width / 2),
    e.clientY - (rect.top + rect.height / 2)
  );

  if (distance < 100) {
    moveNoButton();
  }
});

// Keyboard focus escape
noBtn.addEventListener("focus", moveNoButton);

// YES click logic
yesBtn.addEventListener("click", () => {
  yesBtn.classList.add("clicked");
  launchFlowers();
});

// Flower animation
function launchFlowers() {
  for (let i = 0; i < 40; i++) {
    const flower = document.createElement("div");
    flower.innerText = "🌸";
    flower.style.position = "absolute";
    flower.style.left = Math.random() * 100 + "vw";
    flower.style.top = "-50px";
    flower.style.fontSize = "30px";
    flower.style.animation = `fall ${3 + Math.random() * 3}s linear`;
    flowersContainer.appendChild(flower);

    setTimeout(() => flower.remove(), 6000);
  }
}

// Flower falling animation
const style = document.createElement("style");
style.innerHTML = `
@keyframes fall {
  to {
    transform: translateY(110vh) rotate(360deg);
    opacity: 0;
  }
}
`;
document.head.appendChild(style);
