gsap.registerPlugin(ScrollTrigger, Flip, Draggable, MotionPathPlugin, TextPlugin);

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function reset(targets, vars = {}) {
  gsap.killTweensOf(targets);
  gsap.set(targets, { clearProps: "all", ...vars });
}

function animateHero() {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.from(".brand-mark", { scale: 0, rotation: -90, duration: 0.65 })
    .from(".nav a", { y: -14, opacity: 0, stagger: 0.05, duration: 0.45 }, "<")
    .from(".hero-copy > *", { y: 34, opacity: 0, stagger: 0.08, duration: 0.8 }, "-=0.25")
    .from(".grid-floor span", { scale: 0.72, opacity: 0, stagger: { amount: 0.55, from: "random" }, duration: 0.65 }, "-=0.35")
    .from(".hero-chip", { y: 48, opacity: 0, rotation: -8, stagger: 0.1, duration: 0.8 }, "-=0.25")
    .from(".hero-orbit", { scale: 0.4, opacity: 0, duration: 0.7 }, "-=0.35");

  gsap.to(".hero-orbit", {
    rotation: 360,
    duration: 8,
    repeat: -1,
    ease: "none"
  });

  gsap.to(".hero-chip", {
    y: "random(-14, 14)",
    x: "random(-8, 8)",
    rotation: "random(-3, 3)",
    duration: 2.4,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    stagger: 0.18
  });
}

const lessons = {
  to() {
    reset(".box-to");
    gsap.to(".box-to", {
      x: 190,
      rotation: 18,
      scale: 1.12,
      backgroundColor: "#20b8d5",
      duration: 1,
      ease: "power3.out"
    });
  },

  from() {
    reset(".box-from");
    gsap.from(".box-from", {
      y: 88,
      opacity: 0,
      scale: 0.55,
      rotation: -16,
      stagger: 0.12,
      duration: 0.8,
      ease: "back.out(1.8)"
    });
  },

  fromTo() {
    reset(".box-fromto");
    gsap.fromTo(".box-fromto",
      { x: -90, opacity: 0.25, scale: 0.8 },
      { x: 185, opacity: 1, scale: 1, rotation: 360, duration: 1.2, ease: "expo.out" }
    );
  },

  stagger() {
    reset(".stagger-grid span");
    gsap.from(".stagger-grid span", {
      y: 34,
      opacity: 0,
      scale: 0.45,
      rotation: 20,
      stagger: { amount: 0.75, from: "center", grid: "auto" },
      duration: 0.65,
      ease: "back.out(1.7)"
    });
  },

  eases() {
    reset(".ease-dot");
    const rows = [
      [".dot-power", "power3.out"],
      [".dot-back", "back.out(2.2)"],
      [".dot-elastic", "elastic.out(1, 0.35)"],
      [".dot-bounce", "bounce.out"]
    ];

    rows.forEach(([target, ease]) => {
      gsap.to(target, { x: 260, duration: 1.15, ease });
    });
  },

  timeline() {
    reset(".tl-card, .timeline-bar", { opacity: 1 });
    gsap.set(".tl-card", { y: 70, opacity: 0, rotationX: -60 });
    gsap.set(".timeline-bar", { scaleX: 0 });

    gsap.timeline({ defaults: { ease: "power3.out" } })
      .to(".timeline-bar", { scaleX: 1, duration: 0.9 })
      .to(".tl-card.one", { y: 0, opacity: 1, rotationX: 0, duration: 0.55 }, "-=0.55")
      .to(".tl-card.two", { y: 0, opacity: 1, rotationX: 0, duration: 0.55 }, "-=0.28")
      .to(".tl-card.three", { y: 0, opacity: 1, rotationX: 0, duration: 0.55 }, "-=0.28")
      .to(".tl-card", { y: -10, stagger: 0.08, yoyo: true, repeat: 1, duration: 0.22 });
  },

  keyframes() {
    reset(".keyframe-box");
    gsap.to(".keyframe-box", {
      keyframes: [
        { x: 115, scale: 1.15, backgroundColor: "#f5c84c", duration: 0.35 },
        { y: -72, rotation: 45, backgroundColor: "#20b8d5", duration: 0.35 },
        { x: -95, scale: 0.82, borderRadius: "50%", duration: 0.35 },
        { x: 0, y: 0, rotation: 0, scale: 1, borderRadius: 8, backgroundColor: "#88ce02", duration: 0.45 }
      ],
      easeEach: "power2.inOut"
    });
  },

  repeat() {
    reset(".pulse-core, .pulse-ring");
    gsap.timeline()
      .to(".pulse-core", { scale: 1.55, duration: 0.35, repeat: 5, yoyo: true, ease: "sine.inOut" })
      .to(".pulse-ring", { scale: 1.25, opacity: 0.45, duration: 0.35, repeat: 5, yoyo: true, ease: "sine.inOut" }, 0);
  },

  motionPath() {
    reset(".path-runner");
    gsap.to(".path-runner", {
      duration: 2.2,
      ease: "power1.inOut",
      motionPath: {
        path: "#motionPathLine",
        align: "#motionPathLine",
        alignOrigin: [0.5, 0.5],
        autoRotate: true
      }
    });
  },

  flip() {
    const grid = document.querySelector(".flip-grid");
    const state = Flip.getState(".flip-item");
    grid.classList.toggle("is-stacked");
    Flip.from(state, {
      duration: 0.85,
      ease: "power3.inOut",
      stagger: 0.04,
      absolute: true
    });
  },

  text() {
    reset(".typed-text");
    document.querySelector(".typed-text").textContent = "GSAP anima propriedades CSS.";
    gsap.to(".typed-text", {
      duration: 1.35,
      text: "GSAP tambem anima texto, SVG, scroll e layouts.",
      ease: "none"
    });
  }
};

let controlTimeline;

function createControlTimeline() {
  reset(".control-dot, .control-card");
  controlTimeline = gsap.timeline({ paused: true, defaults: { ease: "power2.inOut" } })
    .to(".control-dot", { x: 330, duration: 1.1 })
    .to(".control-card", { x: 250, rotation: 8, backgroundColor: "#88ce02", duration: 1.1 }, 0)
    .to(".control-card", { y: 44, scale: 1.08, duration: 0.45 }, 0.65);
}

function setupButtons() {
  document.querySelectorAll("[data-lesson] .run-button").forEach((button) => {
    button.addEventListener("click", () => {
      const lesson = button.closest("[data-lesson]").dataset.lesson;
      lessons[lesson]?.();
    });
  });

  document.querySelectorAll("[data-control]").forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.dataset.control;
      controlTimeline[action]();
    });
  });

  document.querySelector("[data-run-all]").addEventListener("click", () => {
    Object.entries(lessons).forEach(([name, run], index) => {
      if (name === "flip") return;
      gsap.delayedCall(index * 0.12, run);
    });
    createControlTimeline();
    controlTimeline.play(0);
  });
}

function setupScrollAnimations() {
  gsap.utils.toArray(".lesson").forEach((lesson) => {
    gsap.from(lesson, {
      y: 70,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: lesson,
        start: "top 78%"
      }
    });
  });

  gsap.from(".scroll-reveal span", {
    scaleY: 0,
    transformOrigin: "bottom",
    stagger: 0.12,
    duration: 0.8,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".scroll-card",
      start: "top 72%"
    }
  });

  const pinTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".pin-section",
      start: "top top",
      end: "+=1200",
      scrub: true,
      pin: true
    }
  });

  pinTimeline
    .from(".pin-copy", { opacity: 0.35, y: 50 })
    .to(".pin-box.one", { x: 160, rotation: 20 })
    .to(".pin-box.two", { y: -95, scale: 1.22 }, "<")
    .to(".pin-box.three", { x: -145, rotation: -18 }, "<")
    .to(".pin-line", { scaleX: 0.35, transformOrigin: "center", backgroundColor: "#88ce02" });

  const horizontalTrack = document.querySelector(".horizontal-track");
  gsap.to(horizontalTrack, {
    xPercent: -66.666,
    ease: "none",
    scrollTrigger: {
      trigger: ".horizontal-scroll",
      start: "top top",
      end: "+=1200",
      pin: true,
      scrub: 1
    }
  });
}

function setupDraggable() {
  Draggable.create(".drag-box", {
    type: "x,y",
    bounds: ".drag-area",
    inertia: false,
    onPress() {
      gsap.to(this.target, { scale: 1.08, duration: 0.18 });
    },
    onRelease() {
      gsap.to(this.target, { scale: 1, duration: 0.18 });
    }
  });
}

function boot() {
  if (prefersReducedMotion) {
    document.documentElement.classList.add("reduced-motion");
    return;
  }

  animateHero();
  createControlTimeline();
  setupButtons();
  setupScrollAnimations();
  setupDraggable();

  gsap.delayedCall(0.4, () => {
    lessons.from();
    lessons.stagger();
  });
}

window.addEventListener("load", boot);
