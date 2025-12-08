document.addEventListener("DOMContentLoaded", () => {
  // Nomor WA Admin CircuitLab (ganti sesuai kebutuhan)
  const ADMIN_WA_NUMBER = "62895366882339";

  // ----------------------------------------------------
  // Bagian 1: Logika Toggle Tema (Dark/Light Mode)
  // ----------------------------------------------------
  const body = document.body;
  const desktopToggle = document.getElementById("theme-toggle-desktop");
  const mobileToggle = document.getElementById("theme-toggle-mobile");

  /**
   * Mengganti kelas 'dark-mode' pada body, menyimpan preferensi, dan memperbarui ikon.
   */
  function toggleTheme() {
    const isDarkMode = body.classList.toggle("dark-mode");
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    updateIcons(isDarkMode);
  }

  /**
   * Memperbarui ikon Matahari/Bulan pada tombol tema.
   * @param {boolean} isDarkMode - True jika mode gelap aktif.
   */
  function updateIcons(isDarkMode) {
    const iconClass = isDarkMode ? "bi-moon-fill" : "bi-sun";

    [desktopToggle, mobileToggle].forEach((toggle) => {
      if (toggle) {
        const icon = toggle.querySelector("i");
        if (icon) icon.className = `bi ${iconClass}`;
      }
    });
  }

  /**
   * Memuat preferensi tema dari Local Storage saat halaman dimuat.
   */
  function loadTheme() {
    const savedTheme = localStorage.getItem("theme");
    const isDarkMode =
      savedTheme === "dark" ||
      (savedTheme === null && body.classList.contains("dark-mode"));

    body.classList.toggle("dark-mode", isDarkMode);
    updateIcons(isDarkMode);
  }

  // Panggil fungsi loadTheme untuk memuat tema saat DOMContentLoaded
  loadTheme();

  // Tambahkan Event Listener ke tombol tema
  [desktopToggle, mobileToggle].forEach((toggle) => {
    if (toggle) toggle.addEventListener("click", toggleTheme);
  });

  // ----------------------------------------------------
  // Bagian 2: Logika Pengiriman Formulir WhatsApp
  // ----------------------------------------------------
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault(); // Mencegah pengiriman formulir default

      // 1. Ambil Nilai dari Formulir
      const nama = document.getElementById("namaLengkap")?.value.trim() || "";
      const email = document.getElementById("email")?.value.trim() || "";
      const whatsapp = document.getElementById("whatsapp")?.value.trim() || "";
      const layanan =
        document.getElementById("jenisLayanan")?.value.trim() || "";
      const deskripsi =
        document.getElementById("deskripsi")?.value.trim() || "";

      // 2. Buat Pesan WhatsApp
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

      // 3. Buat URL WhatsApp dan Encode Pesan
      const waURL = `https://wa.me/${ADMIN_WA_NUMBER}?text=${encodeURIComponent(
        message
      )}`;

      // 4. Arahkan pengguna ke URL tersebut
      window.open(waURL, "_blank");

      // Opsional: Reset formulir setelah pengiriman
      // contactForm.reset();
    });
  }

  // ----------------------------------------------------
  // Bagian 3: Logika Tambahan (Contoh: Efek Scroll Header)
  // ----------------------------------------------------
  const header = document.getElementById("header");
  if (header) {
    window.addEventListener("scroll", () => {
      header.style.boxShadow =
        window.scrollY > 50 ? "0 5px 20px var(--shadow-base)" : "none";
    });
  }
});
