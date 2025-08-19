(function(){const c=document.createElement("link").relList;if(c&&c.supports&&c.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const d of o.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&a(d)}).observe(document,{childList:!0,subtree:!0});function u(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(e){if(e.ep)return;e.ep=!0;const o=u(e);fetch(e.href,o)}})();document.addEventListener("DOMContentLoaded",function(){const l=document.querySelectorAll(".nav-link");l.forEach(t=>{t.addEventListener("click",function(i){i.preventDefault(),l.forEach(s=>s.classList.remove("active")),this.classList.add("active");const r=this.getAttribute("href"),n=document.querySelector(r);if(n){const s=document.querySelector(".header").offsetHeight,m=n.offsetTop-s;window.scrollTo({top:m,behavior:"smooth"})}})}),window.addEventListener("scroll",function(){const t=document.querySelectorAll("section[id]"),i=document.querySelector(".header").offsetHeight,r=window.scrollY+i+100;t.forEach(n=>{const s=n.offsetTop,m=n.offsetHeight,b=n.getAttribute("id"),p=document.querySelector(`.nav-link[href="#${b}"]`);r>=s&&r<s+m&&(l.forEach(v=>v.classList.remove("active")),p&&p.classList.add("active"))})});const c=document.querySelector(".mobile-menu-toggle"),u=document.querySelector(".nav-links");c&&c.addEventListener("click",function(){u.classList.toggle("mobile-menu-open"),this.classList.toggle("active")});const a=document.querySelector(".inquiry-form");a&&a.addEventListener("submit",function(t){t.preventDefault();const i=new FormData(this),r=Object.fromEntries(i);if(!r.name||!r.email){alert("Please fill in all required fields.");return}const n=this.querySelector('button[type="submit"]'),s=n.textContent;n.textContent="Sending...",n.disabled=!0,setTimeout(()=>{alert("Thank you for your inquiry! We will get back to you soon."),this.reset(),n.textContent=s,n.disabled=!1},2e3)});const e={threshold:.1,rootMargin:"0px 0px -50px 0px"},o=new IntersectionObserver(function(t){t.forEach(i=>{i.isIntersecting&&(i.target.style.opacity="1",i.target.style.transform="translateY(0)")})},e);document.querySelectorAll(".amenity-card, .grid-image, .feature").forEach(t=>{t.style.opacity="0",t.style.transform="translateY(20px)",t.style.transition="opacity 0.6s ease, transform 0.6s ease",o.observe(t)});const h=document.querySelector(".header");window.addEventListener("scroll",function(){window.scrollY>100?h.style.background="rgba(255, 255, 255, 0.98)":h.style.background="rgba(255, 255, 255, 0.95)"});const f=document.querySelector("#checkin"),g=document.querySelector("#checkout");if(f&&g){const t=new Date().toISOString().split("T")[0];f.setAttribute("min",t),f.addEventListener("change",function(){const i=new Date(this.value),r=new Date(i);r.setDate(r.getDate()+1),g.setAttribute("min",r.toISOString().split("T")[0])})}});const y=document.createElement("style");y.textContent=`
  @media (max-width: 768px) {
    .nav-links {
      position: fixed;
      top: 100%;
      left: 0;
      right: 0;
      background: white;
      flex-direction: column;
      padding: 2rem;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
      transform: translateY(-100%);
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
    }
    
    .nav-links.mobile-menu-open {
      transform: translateY(0);
      opacity: 1;
      visibility: visible;
    }
    
    .mobile-menu-toggle.active span:nth-child(1) {
      transform: rotate(45deg) translate(5px, 5px);
    }
    
    .mobile-menu-toggle.active span:nth-child(2) {
      opacity: 0;
    }
    
    .mobile-menu-toggle.active span:nth-child(3) {
      transform: rotate(-45deg) translate(7px, -6px);
    }
  }
`;document.head.appendChild(y);
