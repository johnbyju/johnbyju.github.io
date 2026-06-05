(function () {
  const roles = [
    "Full Stack Developer",
    "React Developer",
    "Node.js Engineer",
    "Problem Solver",
  ];

  const typedEl = document.getElementById("typed-text");
  const header = document.getElementById("header");
  const menuBtn = document.getElementById("menu-btn");
  const nav = document.getElementById("nav");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");
  const reveals = document.querySelectorAll(".reveal");

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeRole() {
    const current = roles[roleIndex];
    const displayed = isDeleting
      ? current.substring(0, charIndex - 1)
      : current.substring(0, charIndex + 1);

    charIndex = isDeleting ? charIndex - 1 : charIndex + 1;
    typedEl.textContent = displayed;

    let delay = isDeleting ? 45 : 90;

    if (!isDeleting && charIndex === current.length) {
      delay = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 400;
    }

    setTimeout(typeRole, delay);
  }

  function setActiveNav() {
    const scrollY = window.scrollY + 120;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");

      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      }
    });
  }

  function closeMenu() {
    nav.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.querySelector("i").className = "bx bx-menu";
  }

  menuBtn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
    menuBtn.querySelector("i").className = isOpen ? "bx bx-x" : "bx bx-menu";
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  const backTop = document.getElementById("back-top");
  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 40);
    setActiveNav();
    if (window.scrollY > 300) {
      backTop.classList.add("show");
    } else {
      backTop.classList.remove("show");
    }
  });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        } else {
          // Only reset/hide if the element goes below the viewport (user scrolled up past it)
          if (entry.boundingClientRect.top > 0) {
            entry.target.classList.remove("visible");
          }
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -10px 0px" }
  );

  reveals.forEach((el) => revealObserver.observe(el));

  document.getElementById("year").textContent = new Date().getFullYear();

  // Dark/Light Mode Theme Toggle
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;

  const savedTheme = localStorage.getItem("portfolio-theme") || "dark";
  if (savedTheme === "light") {
    body.classList.add("light-mode");
    themeToggle.querySelector("i").className = "bx bx-sun";
  } else {
    body.classList.remove("light-mode");
    themeToggle.querySelector("i").className = "bx bx-moon";
  }

  themeToggle.addEventListener("click", () => {
    const isLight = body.classList.toggle("light-mode");
    localStorage.setItem("portfolio-theme", isLight ? "light" : "dark");
    themeToggle.querySelector("i").className = isLight ? "bx bx-sun" : "bx bx-moon";
  });

  // Dynamic Project Filtering
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");

      projectCards.forEach((card) => {
        const category = card.getAttribute("data-category");
        if (filterValue === "all" || category === filterValue) {
          card.classList.remove("hide");
        } else {
          card.classList.add("hide");
        }
      });
    });
  });

  // Certificate Modal Logic
  const certModal = document.getElementById("cert-modal");
  const modalClose = document.getElementById("modal-close");
  const modalOverlay = document.getElementById("modal-overlay");
  const certCards = document.querySelectorAll(".cert-card");

  const certData = {
    python: {
      title: "Python Certification",
      date: "Aug 2023",
      issuer: "GUVI Geek Networks, IITM Research Park",
      desc: "Earned Python programming proficiency credentials. Course syllabus included data structure design, core programming controls, object-oriented concepts, modules application, and interactive algorithm design.",
      link: "https://www.linkedin.com/company/guviofficial/",
      icon: "bx bxs-certification"
    }
  };

  certCards.forEach((card) => {
    card.addEventListener("click", (e) => {
      if (e.target.tagName === "A" || e.target.closest("a")) return;

      const certId = card.getAttribute("data-cert-id");
      const data = certData[certId];
      if (data) {
        document.getElementById("modal-title").textContent = data.title;
        document.getElementById("modal-date").textContent = data.date;
        document.getElementById("modal-issuer").textContent = data.issuer;
        document.getElementById("modal-desc").textContent = data.desc;
        document.getElementById("modal-icon").querySelector("i").className = data.icon;
        
        const verifyBtn = document.getElementById("modal-verify-link");
        verifyBtn.href = data.link;

        certModal.classList.add("open");
        certModal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
      }
    });
  });

  function closeModal() {
    certModal.classList.remove("open");
    certModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  modalClose.addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", closeModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && certModal.classList.contains("open")) {
      closeModal();
    }
  });

  // Contact Form Logic
  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");
  const submitBtn = document.getElementById("form-submit-btn");

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("form-name").value.trim();
    const email = document.getElementById("form-email").value.trim();
    const subject = document.getElementById("form-subject").value.trim();
    const message = document.getElementById("form-message").value.trim();

    if (!name || !email || !subject || !message) {
      showStatus("Please fill in all required fields.", "error");
      return;
    }

    if (!validateEmail(email)) {
      showStatus("Please enter a valid email address.", "error");
      return;
    }

    submitBtn.disabled = true;
    const originalText = submitBtn.querySelector("span").textContent;
    submitBtn.querySelector("span").textContent = "Sending...";
    submitBtn.querySelector("i").className = "bx bx-loader-alt bx-spin";

    const actionUrl = contactForm.getAttribute("action");

    // Fallback to mockup submission if still using placeholder
    if (!actionUrl || actionUrl.includes("YOUR_FORM_ID")) {
      setTimeout(() => {
        showStatus("Thank you! Message sent successfully (mockup mode). Please configure your Formspree ID in index.html to receive real emails!", "success");
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.querySelector("span").textContent = originalText;
        submitBtn.querySelector("i").className = "bx bx-send";
      }, 1200);
      return;
    }

    // Submit via AJAX Fetch
    const formData = new FormData(contactForm);
    fetch(actionUrl, {
      method: "POST",
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        showStatus("Thank you! Your message has been sent successfully.", "success");
        contactForm.reset();
      } else {
        response.json().then(data => {
          if (Object.hasOwn(data, 'errors')) {
            showStatus(data["errors"].map(err => err["message"]).join(", "), "error");
          } else {
            showStatus("Oops! There was a problem submitting your form.", "error");
          }
        });
      }
    })
    .catch(error => {
      showStatus("Oops! There was a network issue sending your message.", "error");
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.querySelector("span").textContent = originalText;
      submitBtn.querySelector("i").className = "bx bx-send";
    });
  });

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function showStatus(msg, type) {
    formStatus.textContent = msg;
    formStatus.className = `form-status ${type}`;
    formStatus.hidden = false;

    setTimeout(() => {
      formStatus.hidden = true;
    }, 5000);
  }

  // Preloader control: fade out and hide after animation finishes
  window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    if (preloader) {
      setTimeout(() => {
        preloader.classList.add("fade-out");
        setTimeout(() => {
          preloader.style.display = "none";
        }, 600); // match CSS fade out transition time
      }, 2500); // 0.5s start delay + 2s animation length
    }
  });

  // macOS IDE Grid Cards Interactivity (Close / Restore actions)
  const ideCards = document.querySelectorAll(".ide-card");
  const closeButtons = document.querySelectorAll(".ctrl-dot.close");
  const restoreContainer = document.getElementById("restore-container");
  const restoreBtn = document.getElementById("restore-btn");

  function updateRestoreBanner() {
    const collapsedCount = document.querySelectorAll(".ide-card.collapsed").length;
    if (collapsedCount > 0) {
      restoreContainer.classList.add("show");
    } else {
      restoreContainer.classList.remove("show");
    }
  }

  closeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".ide-card");
      if (card) {
        card.classList.add("collapsed");
        updateRestoreBanner();
      }
    });
  });

  if (restoreBtn) {
    restoreBtn.addEventListener("click", () => {
      ideCards.forEach(card => {
        card.classList.remove("collapsed");
      });
      updateRestoreBanner();
    });
  }

  typeRole();
  setActiveNav();
})();
