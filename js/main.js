(() => {
  const nav = document.getElementById("nav");
  const links = document.getElementById("navLinks");
  const toggle = document.getElementById("menuToggle");
  const glow = document.getElementById("cursorGlow");
  const copyBtn = document.getElementById("copyCa");
  const caText = document.getElementById("caText");
  const canvas = document.getElementById("field");
  const ctx = canvas.getContext("2d");

  const onScroll = () => {
    nav.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  toggle.addEventListener("click", () => {
    links.classList.toggle("open");
  });

  links.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => links.classList.remove("open"));
  });

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  window.addEventListener("pointermove", (event) => {
    glow.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
  });

  copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(caText.textContent.trim());
      copyBtn.textContent = "Copied";
      copyBtn.classList.add("is-copied");
      window.setTimeout(() => {
        copyBtn.textContent = "Copy";
        copyBtn.classList.remove("is-copied");
      }, 1600);
    } catch {
      copyBtn.textContent = "Select";
    }
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  document.querySelectorAll(".reveal").forEach((node, index) => {
    node.style.animationDelay = `${index % 4 * 0.08}s`;
    observer.observe(node);
  });

  const nodes = [];
  const count = 70;

  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  const spawn = () => {
    nodes.length = 0;
    for (let i = 0; i < count; i += 1) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.6 + 0.4,
        s: Math.random() * 0.28 + 0.08,
        a: Math.random() * 0.45 + 0.12,
      });
    }
  };

  const tick = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    nodes.forEach((node) => {
      node.y -= node.s;
      if (node.y < -8) {
        node.y = canvas.height + 8;
        node.x = Math.random() * canvas.width;
      }
      ctx.beginPath();
      ctx.fillStyle = `rgba(122, 212, 255, ${node.a})`;
      ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(tick);
  };

  resize();
  spawn();
  tick();
  window.addEventListener("resize", () => {
    resize();
    spawn();
  });
})();
