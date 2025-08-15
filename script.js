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
const rainEl = document.getElementById("rain");
const lightningEl = document.getElementById("lightning");

let stars = [];
let raindrops = [];
let modeIndex = 0; // 0=Real,1=Hujan,2=Badai,3=Petir,4=Terik
const weatherModes = ["Real","Hujan","Badai","Petir","Terik"];

// Bintang
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

// Awan
function initClouds(){
  clouds.forEach(cloud=>{
    cloud.style.top = Math.random()*70 + "%";
    cloud.style.left = -Math.random()*500 + "px";
    let size = 80 + Math.random()*200;
    cloud.style.width = size + "px";
    cloud.style.height = size*0.3 + "px";
    cloud.dataset.speed = 0.1 + Math.random()*0.5;
    cloud.style.opacity = Math.random()*0.6 + 0.4;
    cloud.dataset.layer = Math.floor(Math.random()*3);
  });
}

// Set warna awan
function setCloudColor(color){
  clouds.forEach(cloud=>{ cloud.style.color = color; });
}

// Move clouds
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

// Rain
function createRain(num=100){
  rainEl.innerHTML="";
  raindrops=[];
  for(let i=0;i<num;i++){
    let drop = document.createElement("div");
    drop.classList.add("raindrop");
    drop.style.left = Math.random()*window.innerWidth + "px";
    drop.style.animationDuration = 0.5 + Math.random()*1 + "s";
    rainEl.appendChild(drop);
    raindrops.push(drop);
  }
}
function showRain(show=true){ rainEl.style.display = show ? "block" : "none"; }

// Lightning
function flashLightning(){
  lightningEl.style.opacity = 1;
  setTimeout(()=>{ lightningEl.style.opacity=0; },100);
}

// Update jam, tanggal, langit, matahari/bulan
function updateClock(){
  const now = new Date();
  let h = now.getHours();
  let m = now.getMinutes();
  let s = now.getSeconds();

  // Jam
  clockEl.textContent = String(h).padStart(2,"0")+":"+String(m).padStart(2,"0")+":"+String(s).padStart(2,"0");

  // Tanggal
  const hari = ["Min","Sen","Sel","Rab","Kam","Jum","Sab"];
  const bulan = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
  dateEl.textContent = `${hari[now.getDay()]}, ${String(now.getDate()).padStart(2,"0")} ${bulan[now.getMonth()]} ${now.getFullYear()}`;

  // Fase langit default
  let skyColor, cloudColor;
  if(modeIndex===0){ // Real
    if(h>=6 && h<12){ skyColor=["#FFEEAD","#87ceeb"]; cloudColor="#fff5cc"; sunEl.style.display="block"; moonEl.style.display="none"; stars.forEach(s=>s.style.opacity=0); showRain(false);}
    else if(h>=12 && h<17){ skyColor=["#00bfff","#87cefa"]; cloudColor="#ffffff"; sunEl.style.display="block"; moonEl.style.display="none"; stars.forEach(s=>s.style.opacity=0); showRain(false);}
    else if(h>=17 && h<19){ skyColor=["#FF7E5F","#FEB47B"]; cloudColor="#ffd1a9"; sunEl.style.display="block"; moonEl.style.display="none"; stars.forEach(s=>s.style.opacity=0); showRain(false);}
    else{ skyColor=["#001f3f","#000"]; cloudColor="rgba(200,220,255,0.4)"; sunEl.style.display="none"; moonEl.style.display="block"; stars.forEach(s=>s.style.opacity=Math.random()*0.8); showRain(false);}
  } else if(modeIndex===1){ // Hujan
    skyColor=["#5c6b73","#7f8c8d"]; cloudColor="#666666"; sunEl.style.display="none"; moonEl.style.display="block"; stars.forEach(s=>s.style.opacity=0); showRain(true); }
  else if(modeIndex===2){ // Badai
    skyColor=["#3a3a3a","#5c5c5c"]; cloudColor="#333333"; sunEl.style.display="none"; moonEl.style.display="block"; stars.forEach(s=>s.style.opacity=0); showRain(true); }
  else if(modeIndex===3){ // Petir
    skyColor=["#2a2a2a","#4a4a4a"]; cloudColor="#222222"; sunEl.style.display="none"; moonEl.style.display="block"; stars.forEach(s=>s.style.opacity=0); showRain(true);
    if(Math.random()<0.02) flashLightning(); }
  else if(modeIndex===4){ // Terik
    skyColor=["#87ceeb","#00bfff"]; cloudColor="#ffffff"; sunEl.style.display="block"; moonEl.style.display="none"; stars.forEach(s=>s.style.opacity=0); showRain(false); }

  skyEl.style.background=`linear-gradient(${skyColor[0]},${skyColor[1]})`;
  setCloudColor(cloudColor);

  // Posisi matahari/bulan
  let totalMinutes = h*60 + m;
  let dayFraction = totalMinutes / (24*60);
  let posX = dayFraction * window.innerWidth;
  let posY = Math.sin(dayFraction * Math.PI)*250 + window.innerHeight*0.5 - 125;
  if(sunEl.style.display==="block"){ sunEl.style.left=posX+"px"; sunEl.style.top=posY+"px"; }
  else{ moonEl.style.left=posX+"px"; moonEl.style.top=posY+"px"; }

  moveClouds();
}

// Ganti mode cuaca saat klik
skyEl.addEventListener("click", ()=>{
  modeIndex = (modeIndex + 1) % weatherModes.length;
  if(["Hujan","Badai","Petir"].includes(weatherModes[modeIndex])) createRain(150);
  else showRain(false);
});

// Start
createStars();
initClouds();
setInterval(updateClock,1000);
updateClock();
