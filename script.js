const clockEl = document.getElementById("clock");
const dateEl = document.getElementById("date");
const skyEl = document.getElementById("sky");
const sunEl = document.getElementById("sun");
const moonEl = document.getElementById("moon");
const clouds = [
  document.getElementById("cloud1"),
  document.getElementById("cloud2"),
  document.getElementById("cloud3"),
  document.getElementById("cloud4"),
  document.getElementById("cloud5"),
  document.getElementById("cloud6")
];

let stars = [];

// Bikin bintang
function createStars(num=100){
  for(let i=0;i<num;i++){
    let star = document.createElement("div");
    star.classList.add("star");
    star.style.width = star.style.height = Math.random()*3 + "px";
    star.style.top = Math.random()*100 + "%";
    star.style.left = Math.random()*100 + "%";
    star.style.animationDuration = (Math.random()*2+1) + "s";
    star.style.opacity = 0;
    skyEl.appendChild(star);
    stars.push(star);
  }
}

// Bikin awan variatif
function initClouds(){
  clouds.forEach(cloud=>{
    cloud.style.top = Math.random()*70 + "%";
    cloud.style.left = -Math.random()*500 + "px";
    let size = 80 + Math.random()*200;
    cloud.style.width = size + "px";
    cloud.style.height = size*0.3 + "px";
    cloud.dataset.speed = 0.1 + Math.random()*0.5;
    cloud.style.opacity = Math.random()*0.6 + 0.4;
    cloud.dataset.layer = Math.floor(Math.random()*3); // 0 = depan, 2 = belakang
  });
}

// Set warna awan sesuai fase
function setCloudColor(color){
  clouds.forEach(cloud=>{
    cloud.style.color = color;
  });
}

// Update posisi awan
function moveClouds(){
  clouds.forEach(cloud=>{
    let left = parseFloat(cloud.style.left);
    left += parseFloat(cloud.dataset.speed);
    if(left > window.innerWidth + 200){
      left = -300;
      cloud.style.top = Math.random()*70 + "%";
      cloud.style.opacity = Math.random()*0.6 + 0.4;
      cloud.dataset.speed = 0.1 + Math.random()*0.5;
    }
    cloud.style.left = left + "px";
  });
}

// Update jam, tanggal, langit, matahari/bulan
function updateClock(){
  const now = new Date();
  let h = now.getHours();
  let m = now.getMinutes();
  let s = now.getSeconds();

  // Update jam
  clockEl.textContent = String(h).padStart(2,"0")+":"+String(m).padStart(2,"0")+":"+String(s).padStart(2,"0");

  // Update tanggal format: Jum, 08 Agustus 2025
  const hari = ["Min","Sen","Sel","Rab","Kam","Jum","Sab"];
  const bulan = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
  let tanggalStr = `${hari[now.getDay()]}, ${String(now.getDate()).padStart(2,"0")} ${bulan[now.getMonth()]} ${now.getFullYear()}`;
  dateEl.textContent = tanggalStr;

  // Fase langit
  let skyColor, cloudColor;
  if(h>=6 && h<12){ // pagi
    skyColor = ["#FFEEAD","#87ceeb"];
    cloudColor = "#fff5cc";
    sunEl.style.display = "block";
    moonEl.style.display = "none";
    stars.forEach(s=>s.style.opacity=0);
  } else if(h>=12 && h<17){ // siang
    skyColor = ["#00bfff","#87cefa"];
    cloudColor = "#ffffff";
    sunEl.style.display = "block";
    moonEl.style.display = "none";
    stars.forEach(s=>s.style.opacity=0);
  } else if(h>=17 && h<19){ // sore
    skyColor = ["#FF7E5F","#FEB47B"];
    cloudColor = "#ffd1a9";
    sunEl.style.display = "block";
    moonEl.style.display = "none";
    stars.forEach(s=>s.style.opacity=0);
  } else{ // malam
    skyColor = ["#001f3f","#000"];
    cloudColor = "rgba(200,220,255,0.4)";
    sunEl.style.display = "none";
    moonEl.style.display = "block";
    stars.forEach(s=>{
      s.style.opacity = Math.random()*0.8;
    });
  }
  skyEl.style.background = `linear-gradient(${skyColor[0]},${skyColor[1]})`;
  setCloudColor(cloudColor);

  // Posisi matahari/bulan (horizontal + melengkung sinus)
  let totalMinutes = h*60 + m;
  let dayFraction = totalMinutes / (24*60); // 0 - 1
  let posX = dayFraction * window.innerWidth;
  let posY = Math.sin(dayFraction * Math.PI) * 250 + window.innerHeight*0.5 - 125; // sinus vertikal

  if(sunEl.style.display==="block"){
    sunEl.style.left = posX + "px";
    sunEl.style.top = posY + "px";
  } else{
    moonEl.style.left = posX + "px";
    moonEl.style.top = posY + "px";
  }

  moveClouds();
}

// Start
createStars();
initClouds();
setInterval(updateClock, 1000);
updateClock();
