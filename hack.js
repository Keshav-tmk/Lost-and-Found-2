const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const particleCount = 80;

// Particle Constructor
function Particle(x, y, dx, dy, size) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.size = size;

  this.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = '#00ffe1';
    ctx.shadowColor = '#00ffe1';
    ctx.shadowBlur = 20;
    ctx.fill();
  };

  this.update = function () {
    if (this.x + this.size > canvas.width || this.x - this.size < 0) this.dx = -this.dx;
    if (this.y + this.size > canvas.height || this.y - this.size < 0) this.dy = -this.dy;
    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  };
}

// Init Particles
function init() {
  particlesArray = [];
  for (let i = 0; i < particleCount; i++) {
    const size = Math.random() * 2 + 1;
    const x = Math.random() * (canvas.width - size * 2) + size;
    const y = Math.random() * (canvas.height - size * 2) + size;
    const dx = (Math.random() - 0.5) * 1;
    const dy = (Math.random() - 0.5) * 1;
    particlesArray.push(new Particle(x, y, dx, dy, size));
  }
}

// Animate Particles
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particlesArray.forEach(p => p.update());
}

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

init();
animate();
