
const birthday = new Date("October 3, 2026 00:00:00").getTime();
const $ = id => document.getElementById(id);

function particles(){
  const box=$("particles"); if(!box)return;
  for(let i=0;i<100;i++){
    const p=document.createElement("i"); p.className="particle";
    p.style.left=Math.random()*100+"%";p.style.top=Math.random()*100+"%";
    p.style.animationDelay=Math.random()*3+"s";box.appendChild(p);
  }
}
function countdown(){
  const d=birthday-Date.now();
  const vals=d>0?[
    Math.floor(d/86400000),
    Math.floor(d%86400000/3600000),
    Math.floor(d%3600000/60000),
    Math.floor(d%60000/1000)
  ]:[0,0,0,0];
  ["days","hours","minutes","seconds"].forEach((id,i)=>{
    const e=$(id);if(e)e.textContent=String(vals[i]).padStart(2,"0");
  });
}
function heart(){
  const h=document.createElement("div");h.className="heart";
  h.textContent=["❤️","💖","💕","💗","✨"][Math.floor(Math.random()*5)];
  h.style.left=Math.random()*100+"%";h.style.fontSize=15+Math.random()*22+"px";
  h.style.animationDuration=4+Math.random()*5+"s";document.body.appendChild(h);
  setTimeout(()=>h.remove(),9000);
}
function confetti(n=100){
  for(let i=0;i<n;i++)setTimeout(()=>{
    const c=document.createElement("div");c.className="confetti";
    c.style.left=Math.random()*100+"%";
    c.style.background=`hsl(${Math.random()*360},100%,70%)`;
    c.style.animationDuration=2+Math.random()*3+"s";
    document.body.appendChild(c);setTimeout(()=>c.remove(),5000);
  },i*12);
}
function celebration(){confetti(150);for(let i=0;i<15;i++)setTimeout(heart,i*80)}
function setupNav(){
 const b=document.querySelector(".menu"),l=document.querySelector("nav .links");
 if(b)b.onclick=()=>l.classList.toggle("open");
}
const audio=$("music"), toggle=$("musicToggle"), bar=$("musicBarBtn"), disc=$("disc");
function toggleMusic(){
 if(!audio)return;
 if(audio.paused){
   audio.play().then(()=>{if(toggle)toggle.textContent="⏸ Pause";if(bar)bar.textContent="⏸";if(disc)disc.classList.add("playing")})
   .catch(()=>alert("Add music/espresso.mp3 to play the song."));
 }else{
   audio.pause();if(toggle)toggle.textContent="▶ Play";if(bar)bar.textContent="▶";if(disc)disc.classList.remove("playing");
 }
}
if(toggle)toggle.onclick=toggleMusic;if(bar)bar.onclick=toggleMusic;

const gift=document.querySelector(".gift"), surprise=$("surprise");
if(gift)gift.onclick=()=>{gift.classList.toggle("open");surprise.classList.toggle("show");celebration()};

const form=$("wishForm"), input=$("wishInput"), list=$("wishesList");
if(form)form.addEventListener("submit",e=>{
 e.preventDefault();const v=input.value.trim();if(!v)return;
 const div=document.createElement("div");div.className="wish";div.textContent="💖 "+v;
 list.prepend(div);input.value="";localStorage.setItem("birthdayWishes",list.innerHTML);celebration();
});
if(list&&localStorage.getItem("birthdayWishes"))list.innerHTML=localStorage.getItem("birthdayWishes");

particles();setupNav();countdown();setInterval(countdown,1000);setInterval(heart,850);
