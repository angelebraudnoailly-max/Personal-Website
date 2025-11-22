class FunPortfolio {
  constructor() {
    this.init();
  }

  init() {
    this.setupSmoothScroll();
    this.setupTitleAnimation();
    this.setupHoverEffects();
    this.setupScrollAnimations();
    this.setupMouseTrail();
    this.setupParallax();
  }

  setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute("href"));
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });
  }

  setupTitleAnimation() {
    // Votre code existant pour les animations de titre
  }

  setupHoverEffects() {
    // Effet sur les boutons avec texte de remplacement
    const buttons = document.querySelectorAll(".btn-primary, .btn-secondary");
    buttons.forEach((button) => {
      const originalText = button.textContent;
      const hoverText = button.getAttribute("data-hover");

      button.addEventListener("mouseenter", () => {
        if (hoverText) {
          button.textContent = hoverText;
        }
      });

      button.addEventListener("mouseleave", () => {
        button.textContent = originalText;
      });
    });

    // Effet de profondeur sur les cartes projet
    const projectCards = document.querySelectorAll(".project-card");
    projectCards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const angleY = (x - centerX) / 25;
        const angleX = (centerY - y) / 25;

        card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-10px)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform =
          "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
      });
    });
  }

  setupScrollAnimations() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";

            if (entry.target.classList.contains("skill-tag")) {
              entry.target.style.animation = "bounceIn 0.6s ease";
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    document
      .querySelectorAll(".project-card, .about-text, .contact-item")
      .forEach((el) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "all 0.6s ease";
        observer.observe(el);
      });
  }

  setupMouseTrail() {
    const trail = document.createElement("div");
    trail.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: var(--gradient);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: difference;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
    document.body.appendChild(trail);

    document.addEventListener("mousemove", (e) => {
      trail.style.left = e.clientX - 10 + "px";
      trail.style.top = e.clientY - 10 + "px";
      trail.style.opacity = "0.5";
    });

    document.addEventListener("mouseleave", () => {
      trail.style.opacity = "0";
    });
  }

  setupParallax() {
    const parallaxSections = document.querySelectorAll(".parallax-section");
    const video = document.querySelector(".background-video");

    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset;

      // Parallaxe pour les sections
      parallaxSections.forEach((section) => {
        const speed = section.getAttribute("data-speed");
        const yPos = -(scrolled * speed);
        section.style.transform = `translateY(${yPos}px)`;
      });

      // Parallaxe pour la vidéo
      if (video) {
        const videoRate = scrolled * -0.5;
        video.style.transform = `scale(1.1) translateY(${videoRate}px)`;
      }
    });
  }
}

// Initialisation
document.addEventListener("DOMContentLoaded", () => {
  new FunPortfolio();
});

// Animations CSS supplémentaires
const style = document.createElement("style");
style.textContent = `
    @keyframes bounceIn {
        0% { transform: scale(0.3); opacity: 0; }
        50% { transform: scale(1.05); }
        70% { transform: scale(0.9); }
        100% { transform: scale(1); opacity: 1; }
    }
    
    .skill-tag:nth-child(odd):hover {
        animation: wiggle 0.5s ease;
    }
    
    .skill-tag:nth-child(even):hover {
        animation: pulse 0.5s ease;
    }
    
    @keyframes wiggle {
        0%, 100% { transform: rotate(0deg); }
        25% { transform: rotate(-5deg); }
        75% { transform: rotate(5deg); }
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
`;
document.head.appendChild(style);
