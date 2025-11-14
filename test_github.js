// Animation d'apparition au scroll

const faders = document.querySelectorAll(".fade-in");

const appearOptions = { threshold: 0.2 };

const appearOnScroll = new IntersectionObserver(function (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("visible");
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach((fader) => appearOnScroll.observe(fader));

// Burger menu
const burger = document.querySelector(".burger");
const navLinks = document.querySelector(".nav-links");

burger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// script.js : animation JS (requestAnimationFrame) – très robuste
(function () {
  const waves = document.querySelectorAll("#visual .wave");
  if (!waves || waves.length === 0) return;

  // paramètres pour chaque calque : amplitude x/y, vitesse, phase
  const params = Array.from(waves).map(() => ({
    ampX: 8 + Math.random() * 10, // amplitude X en px
    ampY: 4 + Math.random() * 12, // amplitude Y en px
    speed: 0.4 + Math.random(),
    phase: Math.random() * Math.PI * 2,
    rotate: (Math.random() - 0.5) * 0.4,
  }));

  // mode "réduction de mouvement" si petit écran -> on réduit amplitudes
  const reduceMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    window.innerWidth < 600;

  function animate(time) {
    const t = time * 0.001; // en secondes
    waves.forEach((el, i) => {
      const p = params[i];
      const speed = p.speed * 2; // tempo plus doux
      // dx limité à ±10px pour éviter que les vagues sortent des bords
      const maxDX = 10;
      const dxRaw =
        Math.sin(t * speed + p.phase) * (reduceMotion ? p.ampX * 0.25 : p.ampX);
      const dx = Math.max(-maxDX, Math.min(maxDX, dxRaw));
      const dy =
        Math.cos(t * speed * 1 + p.phase) *
        (reduceMotion ? p.ampY * 0.25 : p.ampY);
      const rotate = p.rotate * Math.sin(t * speed + p.phase);

      // Appliquer translation (transform attribute, robuste pour SVG)
      el.setAttribute(
        "transform",
        `translate(${dx.toFixed(2)}, ${dy.toFixed(2)}) rotate(${(
          rotate * 10
        ).toFixed(2)})`
      );
    });
    requestAnimationFrame(animate);
  }

  // démarrer
  requestAnimationFrame(animate);
})();
