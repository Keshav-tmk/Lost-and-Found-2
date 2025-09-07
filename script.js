 // ----- Background Canvas Animation -----
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const particleCount = 80;

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

// ----- Post Form -----
document.addEventListener("DOMContentLoaded", () => {
  const imageUpload = document.getElementById("imageUpload");
  const previewBox = document.getElementById("previewBox");
  const previewImage = document.getElementById("previewImage");
  const postForm = document.getElementById("postForm");
  const postsContainer = document.getElementById("postsContainer");
  const searchInput = document.getElementById("searchInput");

  let uploadedImage = "";

  // Preview uploaded image
  if (imageUpload) {
    imageUpload.addEventListener("change", () => {
      const file = imageUpload.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          uploadedImage = e.target.result;
          previewImage.src = uploadedImage;
          previewBox.style.display = "block";
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Handle post submission
  if (postForm) {
    postForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const description = document.getElementById("description").value;
      const link = document.getElementById("linkInput").value;

      const postCard = document.createElement("div");
      postCard.classList.add("post-card");

      if (uploadedImage) {
        const img = document.createElement("img");
        img.src = uploadedImage;
        postCard.appendChild(img);
      }

      const descPara = document.createElement("p");
      descPara.textContent = description;
      postCard.appendChild(descPara);

      if (link) {
        const linkTag = document.createElement("a");
        linkTag.href = link;
        linkTag.target = "_blank";
        linkTag.textContent = "View Link";
        postCard.appendChild(linkTag);
      }

      postsContainer.prepend(postCard);
      postForm.reset();
      previewBox.style.display = "none";
      uploadedImage = "";
    });
  }

  // Handle search
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.toLowerCase();
      const posts = postsContainer.querySelectorAll(".post-card");

      posts.forEach(post => {
        const text = post.textContent.toLowerCase();
        post.style.display = text.includes(query) ? "block" : "none";
      });
    });
  }
});
