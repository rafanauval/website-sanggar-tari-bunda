const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

menuToggle?.addEventListener("click", () => {
    nav?.classList.toggle("open");
});

document.querySelectorAll(".nav a").forEach(link => {
    link.addEventListener("click", () => {
        nav?.classList.remove("open");
    });
});

const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll(".nav a")];

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.toggle(
                    "active",
                    link.getAttribute("href") === "#" + entry.target.id
                );
            });
        }
    });
}, {
    rootMargin: "-35% 0px -55% 0px"
});

sections.forEach(section => observer.observe(section));

const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12
});

document.querySelectorAll(".reveal").forEach(el => {
    revealObserver.observe(el);
});


// ================================
// GALERI / MODAL
// ================================

const modal = document.getElementById("galleryModal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const modalImage = document.getElementById("modalImage");

document.querySelectorAll(".gallery-item").forEach(item => {

    item.addEventListener("click", function (e) {

        e.preventDefault();

        const title = this.getAttribute("data-title") || "";
        const text = this.getAttribute("data-text") || "";

        const image = this.querySelector("img");

        if (!image) return;

        modalTitle.textContent = title;
        modalText.textContent = text;

        if (image && modalImage) {

            // Ambil gambar dari data-image jika tersedia
            // Kalau tidak ada, ambil dari img
            const imageSrc = image.getAttribute("src")

            if (modalImage) {
              modalImage.src = imageSrc;
              modalImage.alt = image.alt || title;
              modalImage.style.display = "block";
            }
        }

        if (modal) {
            modal.classList.add("open");
            modal.setAttribute("aria-hidden", "false");
        }

    });

});


// Tutup modal
function closeModal() {

    if (!modal) return;

    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
}

document.querySelector(".modal-close")?.addEventListener(
    "click",
    closeModal
);

document.querySelector(".modal-backdrop")?.addEventListener(
    "click",
    closeModal
);

document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
        closeModal();
    }
});


// ================================
// FORM PENDAFTARAN
// ================================

const form = document.getElementById("registrationForm");

form?.addEventListener("submit", (e) => {

    e.preventDefault();

    const data = new FormData(form);

    const message =
`Halo Admin Sanggar Tari Bunda 👋

Saya ingin mendaftar:
Nama: ${data.get("nama")}
Usia: ${data.get("usia")}
No. WhatsApp: ${data.get("wa")}
Program: ${data.get("program")}
Pesan: ${data.get("pesan") || "-"}

Mohon informasi jadwal dan biaya pendaftarannya. Terima kasih.`;

    const whatsappNumber = "6285220005934";

    window.open(
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
        "_blank"
    );
});


// Tahun otomatis
const year = document.getElementById("year");

if (year) {
    year.textContent = new Date().getFullYear();
}