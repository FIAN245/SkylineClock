const clockEl = document.getElementById("clock");
const skyEl = document.getElementById("sky");
const sunEl = document.getElementById("sun");
const moonEl = document.getElementById("moon");

// Fungsi buat bintang
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

// Update jam & langit
function updateClock() {
  const now = new Date();
  let h = now.getHours();
  let m = now.getMinutes();
  let s = now.getSeconds();
  clockEl.textContent =
    String(h).padStart(2, "0") + ":" +
    String(m).padStart(2, "0") + ":" +
    String(s).padStart(2, "0");

  // Perubahan langit
  if (h >= 6 && h < 12) { // Pagi
    skyEl.style.background = "linear-gradient(#87ceeb, #f0f8ff)";
    sunEl.style.display = "block";
    moonEl.style.display = "none";
  } else if (h >= 12 && h < 18) { // Siang
    skyEl.style.background = "linear-gradient(#00bfff, #87cefa)";
    sunEl.style.display = "block";
    moonEl.style.display = "none";
  } else if (h >= 18 && h < 19) { // Senja
    skyEl.style.background = "linear-gradient(#ff7e5f, #feb47b)";
    sunEl.style.display = "block";
    moonEl.style.display = "none";
  } else { // Malam
    skyEl.style.background = "linear-gradient(#001f3f, #000)";
    sunEl.style.display = "none";
    moonEl.style.display = "block";
  }

  // Posisi matahari/bulan
  let posX = (h % 12 + m / 60) / 12 * 100; // persen
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
