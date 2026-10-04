const surprisePics = [
  "photos/photo_01.jpg",
  "photos/photo_02.jpg",
  "photos/photo_03.jpg",
  "photos/photo_04.jpg"
];

const surpriseLines = [
  "Hiiii Kutty Papa! 👀💕",
  "Hehe... I’m watching you 😂",
  "Okayyy, keep going! 🎀",
  "Look at meeee 🥹",
  "Memory time! 📸💕",
  "One more surprise! ✨",
  "Almost there... 🎁",
  "HAPPY BIRTHDAYYY! 🎂💗"
];

function showSurpriseBuddy(stageNumber){
  const img = document.getElementById("surpriseBuddyImg");
  const bubble = document.getElementById("surpriseBuddyText");
  if(!img || !bubble) return;
  const idx = Math.max(0, stageNumber) % surprisePics.length;
  img.src = surprisePics[idx];
  bubble.textContent = surpriseLines[Math.max(0, stageNumber) % surpriseLines.length];
  img.classList.remove("buddy-pop");
  void img.offsetWidth;
  img.classList.add("buddy-pop");
}

const photos = [
  'photo_01.jpg',
  'photo_02.jpg',
  'photo_03.jpg',
  'photo_04.jpg',
  'photo_05.jpg',
  'photo_06.jpg',
  'photo_07.jpg',
  'photo_08.jpg',
  'photo_09.jpg',
  'photo_10.jpg',
  'photo_11.jpg',
  'photo_12.jpg',
  'photo_13.jpg',
  'photo_14.jpg',
  'photo_15.jpg',
  'photo_16.jpg',
  'photo_17.jpg',
  'photo_18.jpg',
  'photo_19.jpg',
  'photo_20.jpg',
  'photo_21.jpg',
  'photo_22.jpg',
  'photo_23.jpg',
  'photo_24.jpg',
  'photo_25.jpg',
  'photo_26.jpg',
  'photo_27.jpg',
  'photo_28.jpg',
  'photo_29.jpg',
  'photo_30.jpg',
  'photo_31.jpg',
  'photo_32.jpg',
  'photo_33.jpg',
  'photo_34.jpg'
];

const captions = [
  "Proof that you have survived another year with me. 😭😂",
  "Okay but why are you this cute? 😭❤️",
  "This memory deserves its own little museum. 😂",
  "Certified Kutty Papa moment. 🎀",
  "No explanation. Just vibes. 😌",
  "One more memory for the collection. 💕",
  "This photo is legally too cute. 🚨",
  "Still iconic. Still you. 😂❤️"
];

const musicByStage = {};
for(let i=0;i<=10;i++) musicByStage[i]="music/video_song.mp3";

let stage=0, photoIndex=0, noCount=0;
let photoTimer=null;
const screens=[...document.querySelectorAll(".screen")];
const audio=document.getElementById("music");
const noSound = new Audio("music/funny_no.wav");
noSound.volume=.55;

function go(n){
  showSurpriseBuddy(n);
  stage=n;
  screens.forEach((s,i)=>s.classList.toggle("active",i===n));
  document.getElementById("progressBar").style.width=((n/(screens.length-1))*100)+"%";
  setMusic(n);
  if(n===4){
    renderPhoto();
    startPhotoTimer();
  } else {
    clearInterval(photoTimer);
  }
  window.scrollTo({top:0,behavior:"smooth"});
  if(n===8) confettiBurst();
}

function setMusic(n){
  const src=musicByStage[n];
  if(!src) return;
  if(audio.getAttribute("src")!==src){
    audio.src=src; audio.volume=.38; audio.play().catch(()=>{});
  } else audio.play().catch(()=>{});
}

document.addEventListener("click",()=>{ if(audio.src) audio.play().catch(()=>{}); },{once:true});

function nope(){
  noCount++; noSound.currentTime=0; noSound.play().catch(()=>{});
  const btn=document.getElementById("noBtn");
  const text=document.getElementById("noText");
  const messages=["Nice try 😌","Why are you clicking NO? 😂","Kutty Papa STOPPP 😭","YOU CANNOT ESCAPE 😂","Fine... YES is your destiny 💕"];
  text.textContent=messages[Math.min(noCount-1,messages.length-1)];
  if(noCount>=5){ btn.textContent="YESSS 💕"; btn.onclick=()=>go(3); btn.classList.add("primary"); }
  else { const x=(Math.random()*180-90), y=(Math.random()*100-50); btn.style.transform=`translate(${x}px,${y}px)`; }
}

function startPhotoTimer(){
  clearInterval(photoTimer);
  photoTimer=setInterval(()=>{
    if(stage!==4) return;
    if(photoIndex < photos.length-1){ photoIndex++; renderPhoto(); }
    else { clearInterval(photoTimer); setTimeout(()=>go(5),1000); }
  },1000);
}

function renderPhoto(){
  const img=document.getElementById("memoryImg");
  img.classList.remove("photo-swap"); void img.offsetWidth; img.classList.add("photo-swap");
  img.src="photos/"+encodeURIComponent(photos[photoIndex]);
  document.getElementById("memoryCount").textContent=`Memory ${String(photoIndex+1).padStart(2,"0")} / ${photos.length}`;
  document.getElementById("memoryText").textContent=captions[photoIndex % captions.length];
}

function openGift(){
  const gift=document.getElementById("gift"); gift.classList.add("open");
  document.getElementById("giftHint").textContent="✨ SURPRISE!!! ✨";
  setTimeout(()=>go(8),900);
}

function confettiBurst(){
  const box=document.getElementById("confetti");
  const emojis=["🎉","🎊","💗","✨","🎈","💕","🌸"];
  for(let i=0;i<90;i++){
    const el=document.createElement("span"); el.className="conf";
    el.textContent=emojis[Math.floor(Math.random()*emojis.length)];
    el.style.left=Math.random()*100+"vw"; el.style.setProperty("--x",(Math.random()*260-130)+"px");
    el.style.animationDuration=(2.5+Math.random()*3)+"s"; el.style.animationDelay=(Math.random()*.7)+"s";
    box.appendChild(el); setTimeout(()=>el.remove(),6000);
  }
}

renderPhoto();
setMusic(0);
