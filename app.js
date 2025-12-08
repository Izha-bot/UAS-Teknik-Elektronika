document.addEventListener("DOMContentLoaded", () => {
  // Nomor WA Admin CircuitLab (Ganti dengan nomor yang benar)
  const ADMIN_WA_NUMBER = "6289699616145";

  // --- Elemen Utama ---
  const body = document.body;
  const header = document.getElementById("header");
  const desktopToggle = document.getElementById("theme-toggle-desktop");
  const mobileToggle = document.getElementById("theme-toggle-mobile");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section");
  const contactForm = document.getElementById("contactForm");

  // ----------------------------------------------------
  // Bagian 1: Logika Toggle Tema (Dark/Light Mode)
  // ----------------------------------------------------
  function updateIcons(isDarkMode) {
    // Gunakan 'bi-sun-fill' untuk terang, 'bi-moon-fill' untuk gelap
    const iconClass = isDarkMode ? "bi-moon-fill" : "bi-sun-fill";

    // Update Toggle Desktop
    if (desktopToggle) {
      const icon = desktopToggle.querySelector("i");
      if (icon) icon.className = `bi ${iconClass}`;
    }

    // Update Toggle Mobile
    if (mobileToggle) {
      mobileToggle.innerHTML = `<i class="bi ${iconClass} me-2"></i> Mode ${
        isDarkMode ? "Terang" : "Gelap"
      }`;
    }
  }

  function toggleTheme() {
    const isDarkMode = body.classList.toggle("dark-mode");
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    updateIcons(isDarkMode);
  }

  function loadTheme() {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    let isDarkMode = false;

    if (savedTheme === "dark") {
      isDarkMode = true;
    } else if (savedTheme === "light") {
      isDarkMode = false;
    } else if (prefersDark && savedTheme === null) {
      // Jika tidak ada di LocalStorage, gunakan preferensi sistem
      isDarkMode = true;
    }

    body.classList.toggle("dark-mode", isDarkMode);
    updateIcons(isDarkMode);
  }

  loadTheme();

  // Tambahkan event listener untuk kedua tombol
  [desktopToggle, mobileToggle].forEach((toggle) => {
    if (toggle) toggle.addEventListener("click", toggleTheme);
  });

  // ----------------------------------------------------
  // Bagian 2: Logika Pengiriman Formulir WhatsApp
  // ----------------------------------------------------
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const nama = document.getElementById("namaLengkap")?.value.trim() || "";
      const email = document.getElementById("email")?.value.trim() || "";
      const whatsapp = document.getElementById("whatsapp")?.value.trim() || "";
      const layanan =
        document.getElementById("jenisLayanan")?.value.trim() || "";
      const deskripsi =
        document.getElementById("deskripsi")?.value.trim() || "";

      const message = `*Brief Proyek CircuitLab*
-----------------------------------------------------
Halo CircuitLab, saya ingin mendiskusikan proyek.

*Detail Kontak:*
Nama Lengkap: ${nama}
WhatsApp: ${whatsapp}
Email: ${email}

*Detail Proyek:*
Jenis Layanan: ${layanan}
Deskripsi:
${deskripsi}

-----------------------------------------------------
Mohon balas pesan ini. Terima kasih.`;

      const waURL = `https://wa.me/${ADMIN_WA_NUMBER}?text=${encodeURIComponent(
        message
      )}`;

      window.open(waURL, "_blank");
      contactForm.reset();
    });
  }

  // ----------------------------------------------------
  // Bagian 3: Logika Efek Scroll Header (Sticky) & Navigasi Aktif
  // ----------------------------------------------------

  function handleScroll() {
    // --- Sticky Header Logic ---
    const scrollThreshold = 50;
    if (header) {
      if (window.scrollY > scrollThreshold) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }

    // --- Active Navigation Logic ---
    let currentSectionId = "home";

    sections.forEach((section) => {
      if (section && section.id) {
        const sectionTop = section.offsetTop;
        const offset = window.innerHeight * 0.3;

        if (pageYOffset >= sectionTop - offset) {
          currentSectionId = section.getAttribute("id");
        }
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (
        link.getAttribute("href") &&
        link.getAttribute("href").includes(`#${currentSectionId}`)
      ) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", handleScroll);
  window.addEventListener("load", handleScroll);

  // ----------------------------------------------------
  // Bagian 4: Animasi Hero Section (Run-once on load)
  // ----------------------------------------------------
  const heroContent = document.querySelector(".hero-content");
  const heroIllustration = document.querySelector(".hero-illustration");

  if (heroContent && heroIllustration) {
    // Animasi 'ketika dibuka' (On Load)
    setTimeout(() => {
      heroContent.classList.add("animate");
      heroIllustration.classList.add("animate");
    }, 100);
  }

  // ----------------------------------------------------
  // Bagian 5: Animasi Scroll (NEW - Intersection Observer)
  // ----------------------------------------------------
  function setupScrollAnimation() {
    // Pilih semua elemen yang memiliki atribut data-aos
    const animatedElements = document.querySelectorAll("[data-aos]");

    if (animatedElements.length === 0) return;

    const observerOptions = {
      root: null,
      // Elemen akan terpicu ketika 20% bagian bawahnya memasuki viewport
      rootMargin: "0px 0px -20% 0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target;

          // Ambil kelas animasi dan delay dari atribut data-aos
          const animationType =
            element.getAttribute("data-aos") || "fade-in-up";
          const delay = element.getAttribute("data-aos-delay") || "0";

          // Terapkan delay dan kelas animasi
          element.style.transitionDelay = `${delay}ms`;
          element.classList.add("aos-init", `aos-animate`, animationType);

          // Hentikan observasi setelah animasi pertama kali terpicu
          observer.unobserve(element);
        }
      });
    }, observerOptions);

    // Amati setiap elemen yang ditandai
    animatedElements.forEach((element) => {
      observer.observe(element);
    });
  }

  setupScrollAnimation();
});
