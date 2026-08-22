// ═══════════════════════════════════════════════
// HERO PARTICLES BACKGROUND (canvas, vanilla JS)
// ═══════════════════════════════════════════════
(function () {
  const canvas = document.getElementById('hero-particles');
  if (!canvas) return;

  // Respeita prefers-reduced-motion — não anima se o usuário pediu menos movimento
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;
  if (prefersReducedMotion) return;

  // Desativa em mobile — o hero já carrega uma imagem pesada nessas telas
  if (window.innerWidth < 768) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationFrameId;
  const mouse = { x: null, y: null, radius: 180 };

  // Paleta do projeto: vermelho principal + azul escuro próximo ao tom do fundo
  const PARTICLE_COLORS = [
    'rgba(200, 30, 62, 0.85)',   // vermelho principal (#C81E3E)
    'rgba(200, 30, 62, 0.85)',
    'rgba(200, 30, 62, 0.85)',
    'rgba(58, 74, 107, 0.75)',   // azul escuro (#3A4A6B) — próximo ao tom do fundo, sutil
  ];
  const LINE_COLOR = 'rgba(200, 30, 62, 0.35)';
  const LINE_COLOR_HOVER = 'rgba(90, 112, 158, 0.55)';

  class Particle {
    constructor(x, y, dx, dy, size, color) {
      this.x = x;
      this.y = y;
      this.directionX = dx;
      this.directionY = dy;
      this.size = size;
      this.color = color;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
    update() {
      if (this.x > canvas.width || this.x < 0) this.directionX *= -1;
      if (this.y > canvas.height || this.y < 0) this.directionY *= -1;

      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius + this.size) {
          const forceX = dx / distance;
          const forceY = dy / distance;
          const force = (mouse.radius - distance) / mouse.radius;
          this.x -= forceX * force * 4;
          this.y -= forceY * force * 4;
        }
      }

      this.x += this.directionX;
      this.y += this.directionY;
      this.draw();
    }
  }

  function init() {
    particles = [];
    // Densidade um pouco mais baixa que o original — o hero já tem imagem
    // e texto, não precisa competir por atenção
    const numberOfParticles = (canvas.height * canvas.width) / 14000;
    for (let i = 0; i < numberOfParticles; i++) {
      const size = Math.random() * 1.8 + 0.8;
      const x = Math.random() * (canvas.width - size * 2) + size;
      const y = Math.random() * (canvas.height - size * 2) + size;
      const directionX = Math.random() * 0.3 - 0.15;
      const directionY = Math.random() * 0.3 - 0.15;
      const color =
        PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];
      particles.push(new Particle(x, y, directionX, directionY, size, color));
    }
  }

  function resizeCanvas() {
    const hero = canvas.closest('.hero');
    canvas.width = hero.offsetWidth;
    canvas.height = hero.offsetHeight;
    init();
  }

  function connect() {
    for (let a = 0; a < particles.length; a++) {
      for (let b = a; b < particles.length; b++) {
        const dist =
          (particles[a].x - particles[b].x) ** 2 +
          (particles[a].y - particles[b].y) ** 2;

        if (dist < (canvas.width / 8) * (canvas.height / 8)) {
          const dxMouse = particles[a].x - (mouse.x || 0);
          const dyMouse = particles[a].y - (mouse.y || 0);
          const distMouse = Math.sqrt(dxMouse ** 2 + dyMouse ** 2);

          ctx.strokeStyle =
            mouse.x && distMouse < mouse.radius
              ? LINE_COLOR_HOVER
              : LINE_COLOR;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    animationFrameId = requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => p.update());
    connect();
  }

  window.addEventListener('resize', resizeCanvas);
  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  resizeCanvas();
  animate();
})();
