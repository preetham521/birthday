// ===== PAGE 1 PHOTO MESSAGES =====
document.querySelectorAll('.photo-card').forEach(card => {
  card.addEventListener('click', () => {
    const messageBox = card.querySelector('.message-box');
    const messageText = card.dataset.message;
    if (messageBox.style.display === "block") {
      messageBox.style.display = "none";
    } else {
      messageBox.querySelector("p").textContent = messageText;
      messageBox.style.display = "block";
    }
  });
});

// ===== PAGE SWITCH =====
const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");
document.getElementById("goNext").addEventListener("click", () => {
  page1.classList.add("hidden");
  page2.classList.remove("hidden");
  startPage2Hearts();
});

// ===== PAGE 1 HEARTS =====
const heartsCanvas = document.getElementById("heartsCanvas");
const ctx1 = heartsCanvas.getContext("2d");
heartsCanvas.width = window.innerWidth;
heartsCanvas.height = window.innerHeight;

const hearts = [];
for (let i = 0; i < 30; i++) {
  hearts.push({
    x: Math.random() * heartsCanvas.width,
    y: Math.random() * heartsCanvas.height,
    size: Math.random() * 10 + 5,
    speed: Math.random() * 0.5 + 0.5,
    opacity: Math.random()
  });
}

function drawHearts1() {
  ctx1.clearRect(0, 0, heartsCanvas.width, heartsCanvas.height);
  hearts.forEach(h => {
    ctx1.beginPath();
    ctx1.moveTo(h.x, h.y);
    ctx1.bezierCurveTo(h.x - h.size / 2, h.y - h.size / 2,
                       h.x - h.size, h.y + h.size / 3,
                       h.x, h.y + h.size);
    ctx1.bezierCurveTo(h.x + h.size, h.y + h.size / 3,
                       h.x + h.size / 2, h.y - h.size / 2,
                       h.x, h.y);
    ctx1.fillStyle = `rgba(255,105,180,${h.opacity})`;
    ctx1.fill();
    h.y -= h.speed;
    if (h.y < -10) {
      h.y = heartsCanvas.height + 10;
      h.x = Math.random() * heartsCanvas.width;
    }
  });
  requestAnimationFrame(drawHearts1);
}
drawHearts1();

// ===== PAGE 2 HEARTS + MULTIPLE FLOATING PS =====
const page2HeartsCanvas = document.getElementById("floatingHeartsCanvas");
const ctx2 = page2HeartsCanvas.getContext("2d");

function startPage2Hearts() {
  page2HeartsCanvas.width = window.innerWidth;
  page2HeartsCanvas.height = window.innerHeight;

  const hearts2 = [];
  const letters = [];

  // Create multiple PS letters dynamically
  const floatingLettersContainer = document.querySelector(".floating-letters");
  floatingLettersContainer.innerHTML = ""; // clear previous spans

  const psCount = 20; // number of PS letters
  for (let i = 0; i < psCount; i++) {
    const span = document.createElement("span");
    span.textContent = "PS";
    span.classList.add("ps");
    floatingLettersContainer.appendChild(span);

    letters.push({
      el: span,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      dx: (Math.random() - 0.5) * 1.5,
      dy: -0.5 - Math.random() * 0.5,
      color: `hsl(${Math.random() * 360}, 80%, 60%)`
    });
  }

  // Random hearts
  for (let i = 0; i < 40; i++) {
    hearts2.push({
      x: Math.random() * page2HeartsCanvas.width,
      y: Math.random() * page2HeartsCanvas.height,
      size: Math.random() * 20 + 10,
      speed: Math.random() * 1 + 0.5,
      opacity: Math.random()
    });
  }

  function draw() {
    ctx2.clearRect(0, 0, page2HeartsCanvas.width, page2HeartsCanvas.height);

    // Draw hearts
    hearts2.forEach(h => {
      ctx2.beginPath();
      ctx2.moveTo(h.x, h.y);
      ctx2.bezierCurveTo(h.x - h.size / 2, h.y - h.size / 2,
                         h.x - h.size, h.y + h.size / 3,
                         h.x, h.y + h.size);
      ctx2.bezierCurveTo(h.x + h.size, h.y + h.size / 3,
                         h.x + h.size / 2, h.y - h.size / 2,
                         h.x, h.y);
      ctx2.fillStyle = `rgba(255, 64, 129, ${h.opacity})`;
      ctx2.fill();
      h.y -= h.speed;
      if (h.y < -20) {
        h.y = page2HeartsCanvas.height + 20;
        h.x = Math.random() * page2HeartsCanvas.width;
      }
    });

    // Move PS letters
    letters.forEach(l => {
      l.x += l.dx;
      l.y += l.dy;

      if (l.x > window.innerWidth) l.x = 0;
      if (l.x < 0) l.x = window.innerWidth;
      if (l.y < 0) l.y = window.innerHeight;
      if (l.y > window.innerHeight) l.y = 0;

      l.el.style.left = l.x + "px";
      l.el.style.top = l.y + "px";
      l.el.style.color = l.color;
    });

    requestAnimationFrame(draw);
  }

  draw();
}

// ===== RESIZE CANVASES =====
window.addEventListener("resize", () => {
  heartsCanvas.width = window.innerWidth;
  heartsCanvas.height = window.innerHeight;
  page2HeartsCanvas.width = window.innerWidth;
  page2HeartsCanvas.height = window.innerHeight;
});
