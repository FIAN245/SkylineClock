const clockEl = document.getElementById("clock");
const skyEl = document.getElementById("sky");
const sunEl = document.getElementById("sun");
const moonEl = document.getElementById("moon");
const clouds = [
  document.getElementById("cloud1"),
  document.getElementById("cloud2"),
  document.getElementById("cloud3")
];

function createStars() {
  for (let i = 0; i < 50; i++) {
    let star = document.createElement("div");
    star.classList.add("star");
    star.style.width = star.style.height = Math.random() * 3 + "px";
    star.style.top = Math.random() * 100 + "%";
    star.style.left = Math.random() * 100 + "%";
    star.style.animationDuration = (Math.random() * 2 + 1) + "s";
    skyEl.appendChild(star);
  }
}

function setCloudColor(color) {
  clouds.forEach(cloud => {
    cloud.style.color = color;
  });
}

function updateClock() {
  const now = new Date();
  let h = now.getHours();
  let m = now.getMinutes();
  let s = now.getSeconds();
  clockEl.textContent =
    String(h).padStart(2, "0") + ":" +
    String(m).padStart(2, "0") + ":" +
    String(s).padStart(2, "0");

  // Fase langit
  if (h >= 6 && h < 12) { // Pagi
    skyEl.style.background = "linear-gradient(#FFEEAD, #87ceeb)";
    sunEl.style.display = "block";
    moonEl.style.display = "none";
    setCloudColor("#fff5cc");
  } else if (h >= 12 && h < 17) { // Siang
    skyEl.style.background = "linear-gradient(#00bfff, #87cefa)";
    sunEl.style.display = "block";
    moonEl.style.display = "none";
    setCloudColor("#ffffff");
  } else if (h >= 17 && h < 19) { // Sore
    skyEl.style.background = "linear-gradient(#FF7E5F, #FEB47B)";
    sunEl.style.display = "block";
    moonEl.style.display = "none";
    setCloudColor("#ffd1a9");
  } else { // Malam
    skyEl.style.background = "linear-gradient(#001f3f, #000)";
    sunEl.style.display = "none";
    moonEl.style.display = "block";
    setCloudColor("rgba(200, 220, 255, 0.4)");
  }

  // Posisi matahari/bulan
  let posX = (h % 12 + m / 60) / 12 * 100;
  if (sunEl.style.display === "block") {
    sunEl.style.left = posX + "%";
    sunEl.style.bottom = "50%";
  } else {
    moonEl.style.left = posX + "%";
    moonEl.style.bottom = "50%";
  }
}

// Mulai
createStars();
setInterval(updateClock, 1000);
updateClock();
