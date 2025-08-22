document.addEventListener("DOMContentLoaded", () => {
  const mobileToggle = document.querySelector(".mobile-menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  let links = document.querySelectorAll(".nav-link");

  console.log("menu debug:", { mobileToggle: !!mobileToggle, navLinks: !!navLinks, linksCount: links.length });

  // cria links de teste se não existirem (apenas para debug)
  if (navLinks && links.length === 0) {
    navLinks.innerHTML = `
      <a href="#home" class="nav-link">Home</a>
      <a href="#about" class="nav-link">Sobre</a>
      <a href="#contact" class="nav-link">Reservar</a>
    `;
    links = document.querySelectorAll(".nav-link");
    console.log("criadas nav-links de fallback");
  }

  if (!mobileToggle) {
    console.error("mobileToggle não encontrado");
    return;
  }
  if (!navLinks) {
    console.error("navLinks não encontrado");
    return;
  }

  // garante spans do hamburger
  if (!mobileToggle.querySelector("span")) {
    mobileToggle.innerHTML = "<span></span><span></span><span></span>";
  }

  mobileToggle.setAttribute("aria-expanded", "false");
  mobileToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    const opened = navLinks.classList.toggle("open");
    mobileToggle.classList.toggle("active", opened);
    mobileToggle.setAttribute("aria-expanded", String(opened));
    document.body.style.overflow = opened ? "hidden" : "";
    console.log("menu toggled:", opened);
  });

  // Fecha menu ao clicar num link
  links.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      mobileToggle.classList.remove("active");
      mobileToggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });
  });

  // clique fora para fechar
  document.addEventListener("click", (ev) => {
    if (!navLinks.contains(ev.target) && !mobileToggle.contains(ev.target) && navLinks.classList.contains("open")) {
      navLinks.classList.remove("open");
      mobileToggle.classList.remove("active");
      mobileToggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
      console.log("menu fechado por clique fora");
    }
  });

  /* ====== SCROLL SUAVE ====== */
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      if (link.hash) {
        e.preventDefault();
        const target = document.querySelector(link.hash);
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 60, // ajusta altura do header
            behavior: "smooth",
          });
        }
      }
    });
  });

  /* ====== DESTAQUE DO LINK ATIVO ====== */
  const sections = document.querySelectorAll("section");
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 80;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    links.forEach((link) => {
      link.classList.remove("active");
      if (link.hash === "#" + current) {
        link.classList.add("active");
      }
    });
  });

  /* ====== ANIMAÇÃO DE FADE-IN ====== */
  const fadeEls = document.querySelectorAll(".fade-in");
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  fadeEls.forEach((el) => observer.observe(el));

  /* ====== FOOTER ANO AUTOMÁTICO ====== */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ====== FORMULÁRIO DE CONTACTO ====== */
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Mensagem enviada! Obrigado pelo contacto.");
      form.reset();
    });
  }
});