import{S as f,a as u,i as n}from"./assets/vendor-mj6yH6lW.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const m=document.querySelector(".gallery");function d(o){m.innerHTML=o.map(({webformatURL:s,largeImageURL:i,tags:e,likes:t,views:a,comments:c,downloads:g})=>`
      <li class="gallery-item">
        <a href="${i}" class="gallery-link">
          <img src="${s}" alt="${e}" class="gallery-image" />
        </a>
        <div class="info">
            <p><strong>Likes:</strong> ${t}</p>
            <p><strong>Views:</strong> ${a}</p>
            <p><strong>Comments:</strong> ${c}</p>
            <p><strong>Downloads:</strong> ${g}</p>
          </div>
      </li>`).join(""),new f(".gallery a",{captionsData:"alt",captionDelay:250}).refresh()}const p="49441888-9a9fca759a65c9c8b8f6579f2",y="https://pixabay.com/api/";async function h(o){try{const r=await u.get(y,{params:{key:p,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0}});return console.log(r.data),r.data.hits}catch(r){throw console.error("Error fetching images:",r),r}}const L=document.querySelector(".form"),l=document.querySelector(".loader"),b=document.querySelector(".gallery");L.addEventListener("submit",async o=>{o.preventDefault();const r=o.target.elements["search-text"].value.trim();if(console.log(r),!r){n.error({title:"Error",message:"Please enter a search query!"});return}b.innerHTML="",l.classList.add("visible");try{const s=await h(r);s.length===0?n.warning({title:"Oops!",message:"No images found. Try again!"}):d(s)}catch{n.error({title:"Error",message:" Failed to fetch images. Try again later!"})}finally{l.classList.remove("visible")}});
//# sourceMappingURL=index.js.map
