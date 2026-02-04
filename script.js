const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const flowersContainer = document.getElementById("flowers");

let escaping = false;

// place NO initially near YES (but not overlapping)
function placeNoInitially() {
  const yesRect = yesBtn.getBoundingClientRect();
  noBtn.style.left = `${yesRect.right + 20}px`;
  noBtn.style.top = `${yesRect.top}px`;
}

placeNoInitially();

function moveNoButton() {
  if (escaping) return;
  escaping = true;

  const yesRect = yesBtn.getBoundingClientRect();

  const maxX = window.innerWidth - noBtn.offsetWidth - 10;
  const maxY = window.innerHeight - noBtn.offsetHeight - 10;

  let x, y;

  do {
    x = Math.random() * maxX;
    y = Math.random() * maxY;
  } while (
    // forbidden zone around YES
    x < yesRect.right + 40 &&
    x + noBtn.offsetWidth > yesRect.left - 40 &&
    y < yesRect.bottom + 40 &&
    y + noBtn.offsetHeight > yesRect.top - 40
  );

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;

  setTimeout(() => {
    escaping = false;
  }, 250); // matches CSS transition
}

// PROXIMITY-BASED ESCAPE (NO FREEZE, NO JITTER)
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

// Mobile
document.addEventListener("touchstart", moveNoButton);

// Block clicks completely
noBtn.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
});

// YES logic (unchanged)
yesBtn.addEventListener("click", () => {
  yesBtn.classList.add("clicked");
  dropFlowers();
});

function dropFlowers() {
  for (let i = 0; i < 40; i++) {
    const flower = document.createElement("div");
    flower.textContent = "🌸";
    flower.style.position = "fixed";
    flower.style.left = Math.random() * 100 + "vw";
    flower.style.top = "-40px";
    flower.style.fontSize = "30px";
    flower.style.animation = `fall ${3 + Math.random() * 3}s linear`;
    flowersContainer.appendChild(flower);

    setTimeout(() => flower.remove(), 6000);
  }
}

// animation
const style = document.createElement("style");
style.textContent = `
@keyframes fall {
  to {
    transform: translateY(110vh) rotate(360deg);
    opacity: 0;
  }
}`;
document.head.appendChild(style);
