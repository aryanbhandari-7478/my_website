/* Three.js Transparent Loss Landscape */
(function(){
  const container = document.getElementById('three-root');
  if(!container) return;

  const scene = new THREE.Scene();
  scene.background = null;

  const camera = new THREE.PerspectiveCamera(45, container.clientWidth/container.clientHeight, 0.1, 2000);
  camera.position.set(50, 20, 50);

  const renderer = new THREE.WebGLRenderer({ antialias:true, alpha:true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  const hemiLight = new THREE.HemisphereLight(0x8899ff, 0x100011, 0.6);
  scene.add(hemiLight);
  const dirLight = new THREE.DirectionalLight(0xfff4cc, 0.8);
  dirLight.position.set(-40,50,30);
  scene.add(dirLight);

  const SIZE=40, SEG=60;
  const geometry = new THREE.PlaneGeometry(SIZE,SIZE,SEG,SEG);
  geometry.rotateX(-Math.PI/2);


  const material = new THREE.MeshStandardMaterial({color:0x2222ff, side:THREE.DoubleSide, wireframe:true}); // colour of animation
  const surface = new THREE.Mesh(geometry, material);
  scene.add(surface);

  const ball = new THREE.Mesh(new THREE.SphereGeometry(1,32,32), new THREE.MeshStandardMaterial({color:0xff3b1f}));
  ball.position.set(0,5,0);
  scene.add(ball);

  const axesLength=SIZE/2+4, yAxisHeight=15;
  const axesMaterial = new THREE.LineBasicMaterial({ color:0xffffff });
  const axesGeometry = new THREE.BufferGeometry();
  axesGeometry.setFromPoints([
    new THREE.Vector3(-axesLength,0,0), new THREE.Vector3(axesLength,0,0),
    new THREE.Vector3(0,0,-axesLength), new THREE.Vector3(0,0,axesLength),
    new THREE.Vector3(0,0,0), new THREE.Vector3(0,yAxisHeight,0)
  ]);
  const axes = new THREE.LineSegments(axesGeometry, axesMaterial);
  scene.add(axes);

  function makeLabel(text,pos){
    const canvas = document.createElement('canvas');
    canvas.width=64; canvas.height=32;
    const ctx = canvas.getContext('2d');
    ctx.font="20px Arial";
    ctx.fillStyle="white";
    ctx.fillText(text,0,20);
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate=true;
    const spriteMat = new THREE.SpriteMaterial({ map:texture });
    const sprite = new THREE.Sprite(spriteMat);
    sprite.scale.set(4,2,1);
    sprite.position.copy(pos);
    scene.add(sprite);
  }

  const step=10;
  for(let i=-axesLength;i<=axesLength;i+=step){
    makeLabel(i,new THREE.Vector3(i,0,0));
    makeLabel(i,new THREE.Vector3(0,0,i));
  }
  makeLabel('Y',new THREE.Vector3(0,axesLength,0));

  const clock=new THREE.Clock();
  function animate(){
    const t=clock.getElapsedTime();
    for(let i=0;i<geometry.attributes.position.count;i++){
      const x = geometry.attributes.position.getX(i);
      const z = geometry.attributes.position.getZ(i);
      const y = Math.sin(0.2*x+t)*2 + Math.cos(0.2*z+t)*2;
      geometry.attributes.position.setY(i,y);
    }
    geometry.attributes.position.needsUpdate=true;
    ball.position.y=Math.sin(t*2)*2 +3;
    camera.position.x=50*Math.cos(t*0.2);
    camera.position.z=50*Math.sin(t*0.2);
    camera.lookAt(0,0,0);
    renderer.render(scene,camera);
    requestAnimationFrame(animate);
  }
  animate();

  window.addEventListener('resize',()=>{
    camera.aspect = container.clientWidth/container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth,container.clientHeight);
  });
})();






const track = document.querySelector('.gallery-track');
track.innerHTML += track.innerHTML;


const viewMoreBtn = document.querySelector(".view-more");
const galleryContainer = document.querySelector(".gallery-container");
const galleryTrack = document.querySelector(".gallery-track");

viewMoreBtn.addEventListener("click", () => {
    // Stop auto animation
    galleryTrack.style.animation = "none";

    // Enable manual scrolling
    galleryContainer.style.overflowX = "auto";

    // Optional UX touch
    viewMoreBtn.textContent = "Scroll / Click on the image";
    viewMoreBtn.disabled = true;
});

const galleryImages = document.querySelectorAll(".gallery-track img");
const galleryModal = document.getElementById("gallery-modal");

galleryImages.forEach(img => {
  img.addEventListener("click", () => {
    document.getElementById("gallery-modal-img").src = img.src;
    document.getElementById("gallery-modal-title").textContent =
      img.dataset.title || "Gallery Item";
    document.getElementById("gallery-modal-desc").textContent =
      img.dataset.desc || "";

    galleryModal.classList.add("active");
    document.body.style.overflow = "hidden";
  });
});

/* Close */
document.querySelector(".gallery-close").onclick = closeGallery;
galleryModal.onclick = e => {
  if (e.target === galleryModal) closeGallery();
};

function closeGallery() {
  galleryModal.classList.remove("active");
  document.body.style.overflow = "";
}



        // Mobile menu toggle
        const menuToggle = document.getElementById('menuToggle');
        const navLinks = document.getElementById('navLinks');

        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Active navigation highlighting
        const sections = document.querySelectorAll('section');
        const navItems = document.querySelectorAll('.nav-link');

        function updateActiveNav() {
            const scrollPosition = window.pageYOffset + 100;

            sections.forEach((section, index) => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navItems.forEach(item => item.classList.remove('active'));
                    const currentNav = document.querySelector(`.nav-link[href="#${section.id}"]`);
                    if (currentNav) currentNav.classList.add('active');
                }
            });
        }


        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            updateActiveNav();
        });

        // Initial active nav update
        updateActiveNav();

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });






const roles = [
  "Data Science",
  "Artificial Intelligence",
  "Computer Science",
  "Applied Mathematics"
];

const typingEl = document.getElementById("typingText");

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeLoop() {
  const current = roles[roleIndex];
  
  if (!isDeleting) {
    typingEl.textContent = current.slice(0, charIndex++);
    if (charIndex > current.length + 8) {
      isDeleting = true;
    }
  } else {
    typingEl.textContent = current.slice(0, charIndex--);
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  const speed = isDeleting ? 50 : 80;
  setTimeout(typeLoop, speed);
}

typeLoop();





// Feature tabs functionality
const tabs = document.querySelectorAll('.tab-item');
const panels = document.querySelectorAll('.content-panel');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const tabId = tab.getAttribute('data-tab');
        
        // Remove active class from all tabs and panels
        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding panel
        tab.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    });
});

// Form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    // Add your form submission logic here
    alert('Message sent! We\'ll get back to you soon.');
    this.reset();
});

/* ===============================
   PROJECT VIEW DETAILS MODAL
================================ */

document.addEventListener("click", function (e) {

  /* ---------- OPEN MODAL ---------- */
  const btn = e.target.closest(".view-details");
  if (btn) {
    const card = btn.closest(".project-card");
    const modal = document.getElementById("project-modal");

    // Populate modal content from data attributes
    document.getElementById("modal-title").textContent =
      card.dataset.title || "Project";

    document.getElementById("modal-domain").textContent =
      card.dataset.domain || "";

    document.getElementById("modal-overview").textContent =
      card.dataset.overview || "";

    // Features
    const featuresEl = document.getElementById("modal-features");
    featuresEl.innerHTML = "";
    (card.dataset.features || "").split(",").forEach(f => {
      if (f.trim()) {
        const li = document.createElement("li");
        li.textContent = f.trim();
        featuresEl.appendChild(li);
      }
    });

    // Tech stack
    const techEl = document.getElementById("modal-techstack");
    techEl.innerHTML = "";
    (card.dataset.tech || "").split(",").forEach(t => {
      if (t.trim()) {
        const span = document.createElement("span");
        span.textContent = t.trim();
        techEl.appendChild(span);
      }
    });


    document.getElementById("modal-github").href =
      card.dataset.github || "#";

    // Show modal
    modal.classList.add("active");
    
    // Scroll modal to top and disable background scroll
    modal.scrollTop = 0;
    document.body.style.overflow = "hidden";

    return;
  }

  /* ---------- CLOSE MODAL ---------- */
  const modal = document.getElementById("project-modal");
  if (
    e.target.classList.contains("close-btn") ||
    e.target.id === "project-modal"
  ) {
    modal.classList.remove("active");
    document.body.style.overflow = ""; // Restore scroll
  }
});

/* ---------- ESC KEY CLOSE ---------- */
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    const modal = document.getElementById("project-modal");
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
});

/* ---------- OPTIONAL: Scroll thin scrollbar styling ---------- */
/* This applies only if modal content overflows */
const modalContent = document.querySelector("#project-modal .modal-content");
if(modalContent) {
  modalContent.style.overflowY = "auto";
  modalContent.style.scrollbarWidth = "thin"; // Firefox
  modalContent.style.scrollbarColor = "rgba(20,255,236,0.4) transparent";

  // Chrome, Edge, Safari
  const style = document.createElement('style');
  style.innerHTML = `
    #project-modal .modal-content::-webkit-scrollbar { width: 6px; }
    #project-modal .modal-content::-webkit-scrollbar-thumb { background: rgba(20,255,236,0.4); border-radius: 3px; }
    #project-modal .modal-content::-webkit-scrollbar-track { background: transparent; }
  `;
  document.head.appendChild(style);
}

