function updateClock(){
  let now = new Date();
  let h = now.getHours();
  let m = now.getMinutes();
  let s = now.getSeconds();

  // Format jam
  let timeStr = String(h).padStart(2,"0")+":"+
                String(m).padStart(2,"0")+":"+
                String(s).padStart(2,"0");
  document.getElementById("clock").textContent = timeStr;

  // Format tanggal (08 Agustus 2025)
  let day = String(now.getDate()).padStart(2,"0");
  let month = now.toLocaleString("id-ID", { month: "long" });
  let year = now.getFullYear();
  document.getElementById("date").textContent = `${day} ${month} ${year}`;

  // Perubahan warna langit (pagi, siang, sore, malam)
  let sky = document.getElementById("sky");
  if(h >= 5 && h < 11){ // pagi
    sky.style.background = "linear-gradient(to bottom, #FFD580, #87ceeb)";
    setCloudColor("#fff");
  } else if(h >= 11 && h < 15){ // siang
    sky.style.background = "linear-gradient(to bottom, #87ceeb, #fefefe)";
    setCloudColor("#f1f1f1");
  } else if(h >= 15 && h < 18){ // sore
    sky.style.background = "linear-gradient(to bottom, #FF8C00, #FFB266)";
    setCloudColor("#ffeedd");
  } else { // malam
    sky.style.background = "linear-gradient(to bottom, #0D1B2A, #1B263B)";
    setCloudColor("#bbb");
  }

  // Putar orbit (matahari & bulan)
  let totalSeconds = h*3600 + m*60 + s;
  let degree = (totalSeconds / 86400) * 360; // 24 jam = 360 derajat

  document.getElementById("sun").style.transform = 
    `rotate(${degree}deg) translate(150px) rotate(-${degree}deg)`;

  document.getElementById("moon").style.transform = 
    `rotate(${degree+180}deg) translate(150px) rotate(-${degree+180}deg)`;
}

function setCloudColor(color){
  document.querySelectorAll(".cloud").forEach(c => {
    c.style.background = color;
  });
}

// Generate awan random
function createClouds(num){
  const cloudsContainer = document.getElementById("clouds");
  for(let i=0; i<num; i++){
    let cloud = document.createElement("div");
    cloud.classList.add("cloud");
    let size = Math.random()*100+50; // 50–150px
    cloud.style.width = size+"px";
    cloud.style.height = size*0.6+"px";
    cloud.style.top = Math.random()*80+"%";
    cloud.style.left = Math.random()*100+"%";
    cloud.style.animationDuration = (30+Math.random()*60)+"s";
    cloudsContainer.appendChild(cloud);
  }
}

createClouds(6);
setInterval(updateClock,1000);
updateClock();
