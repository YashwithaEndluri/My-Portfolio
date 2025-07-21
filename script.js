// Typing animation for the hero tagline
window.addEventListener('DOMContentLoaded', () => {
  // Typing effect for tagline
  const tagline = document.querySelector('.hero-tagline');
  if (tagline) {
    const text = tagline.textContent;
    tagline.textContent = '';
    let i = 0;
    function type() {
      if (i < text.length) {
        tagline.textContent += text.charAt(i);
        i++;
        setTimeout(type, 40);
      }
    }
    type();
  }

  // Animate sections on scroll
  const sections = document.querySelectorAll('.section');
  const observer = new window.IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Animate progress bars in skills section
        if (entry.target.id === 'skills') {
          document.querySelectorAll('.progress-bar').forEach(bar => {
            const val = bar.getAttribute('data-progress');
            bar.innerHTML = '<div style="height:100%;background:linear-gradient(90deg,#20add0 60%,#6ee2f5 100%);border-radius:8px;width:0;transition:width 1.2s cubic-bezier(.77,0,.18,1);"></div>';
            setTimeout(() => {
              bar.querySelector('div').style.width = val + '%';
            }, 100);
          });
        }
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  sections.forEach(section => {
    observer.observe(section);
  });

  // Animate submit button on click
  const submitBtn = document.querySelector('.submit-btn');
  if (submitBtn) {
    submitBtn.addEventListener('click', (e) => {
      submitBtn.animate([
        { transform: 'scale(1)' },
        { transform: 'scale(1.08)' },
        { transform: 'scale(1)' }
      ], {
        duration: 300,
        easing: 'ease-in-out'
      });
    });
  }

  // Hamburger menu for mobile nav
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }

  // Animated background: large, blue/cyan/purple blobs, more movement
  const canvas = document.getElementById('bg-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    function resizeCanvas() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }
    window.addEventListener('resize', resizeCanvas);

    // Large, blue/cyan/purple blobs
    const colors = [
      ["#20add0", "#6ee2f5"],
      ["#6ee2f5", "#a259f7"],
      ["#a259f7", "#20add0"],
      ["#6ee2f5", "#20add0"],
      ["#20add0", "#a259f7"]
    ];
    const blobs = Array.from({ length: 7 }, (_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.5 + Math.random() * 0.7;
      const r = 180 + Math.random() * 180;
      const colorIdx = i % colors.length;
      return {
        baseX: Math.random() * width,
        baseY: Math.random() * height,
        x: 0,
        y: 0,
        r,
        angle,
        speed,
        colorStops: [
          colors[colorIdx][0] + 'cc',
          colors[colorIdx][1] + '99',
          '#ffffff22'
        ],
        phase: Math.random() * Math.PI * 2
      };
    });
    let t = 0;
    function drawBlobs() {
      ctx.clearRect(0, 0, width, height);
      t += 0.018;
      blobs.forEach((blob, i) => {
        // Animate position in a big circle
        const amp = 120 + 90 * Math.sin(t + blob.phase + i);
        blob.x = blob.baseX + Math.cos(blob.angle + t * blob.speed) * amp;
        blob.y = blob.baseY + Math.sin(blob.angle + t * blob.speed) * amp;
        // Draw gradient blob
        const grad = ctx.createRadialGradient(blob.x, blob.y, blob.r * 0.2, blob.x, blob.y, blob.r);
        grad.addColorStop(0, blob.colorStops[0]);
        grad.addColorStop(0.7, blob.colorStops[1]);
        grad.addColorStop(1, blob.colorStops[2]);
        ctx.beginPath();
        ctx.arc(blob.x, blob.y, blob.r, 0, 2 * Math.PI);
        ctx.fillStyle = grad;
        ctx.globalAlpha = 0.8;
        ctx.fill();
        ctx.globalAlpha = 1;
      });
    }
    function animate() {
      drawBlobs();
      requestAnimationFrame(animate);
    }
    animate();
  }

  // Scroll-based nav link highlighting
  const sectionsAll = document.querySelectorAll('section');
  const navLinksAll = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinksAll.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href').replace('#','') === entry.target.id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.5 });

  sectionsAll.forEach(section => {
    sectionObserver.observe(section);
  });

  // Smooth scroll for nav links
  navLinksAll.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 60,
            behavior: 'smooth'
          });
        }
      }
    });
  });
}); 