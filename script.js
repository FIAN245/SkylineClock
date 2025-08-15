const clockEl = document.getElementById("clock");
const skyEl = document.getElementById("sky");
const sunEl = document.getElementById("sun");
const moonEl = document.getElementById("moon");
const clouds = [
  document.getElementById("cloud1"),
  document.getElementById("cloud2"),
  document.getElementById("cloud3"),
  document.getElementById("cloud4")
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

// Bikin awan dinamis
function initClouds(){
  clouds.forEach(cloud=>{
    cloud.style.top = Math.random()*70 + "%";
    cloud.style.left = -Math.random()*400 + "px";
    let size = 100 + Math.random()*150;
    cloud.style.width = size + "px";
    cloud.style.height = size*0.3 + "px";
    cloud.dataset.speed = 0.2 + Math.random()*0.5;
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
    if(left>window.innerWidth+200) left=-300;
    cloud.style.left = left + "px";
  });
}

// Update jam, langit, matahari/bulan
function updateClock(){
  const now = new Date();
  let h = now.getHours();
  let m = now.getMinutes();
  let s = now.getSeconds();
  clockEl.textContent = String(h).padStart(2,"0")+":"+String(m).padStart(2,"0")+":"+String(s).padStart(2,"0");

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

  // Posisi matahari/bulan (horizontal + sinus vertical)
  let posX = (h + m/60)/24*window.innerWidth;
  let angle = (h + m/60)/24*Math.PI;
  let posY = Math.sin(angle)*200 + window.innerHeight*0.5;

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
