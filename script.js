document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. GESTION DU MENU MOBILE (Burger Menu)
  // ==========================================
  const burgerMenu = document.querySelector(".burger-menu");
  const navMenu = document.querySelector("nav ul");

  if (burgerMenu) {
    burgerMenu.addEventListener("click", () => {
      navMenu.classList.toggle("show");
    });
  }

  document.querySelectorAll("nav a").forEach((link) => {
    link.addEventListener("click", () => {
      if (navMenu.classList.contains("show")) {
        navMenu.classList.remove("show");
      }
    });
  });

  // ==========================================
  // 2. GESTION DU CARROUSEL / LIGHTBOX
  // ==========================================
  const modal = document.getElementById("image-modal");
  const modalImg = document.getElementById("modal-img");
  const modalCaption = document.getElementById("modal-caption");
  const modalLink = document.getElementById("modal-link"); // Le nouveau bouton de lien
  const closeModalBtn = document.querySelector(".close-modal");
  const prevBtn = document.querySelector(".prev-modal-btn");
  const nextBtn = document.querySelector(".next-modal-btn");

  let currentGalleryImages = [];
  let currentImageIndex = 0;

  // Ouvrir la boîte noire et injecter le lien
  function openModal() {
    if (currentGalleryImages.length > 0 && modal && modalImg) {
      const targetImg = currentGalleryImages[currentImageIndex];
      modalImg.src = targetImg.src;

      // Injecter le texte alternatif comme titre
      if (modalCaption) {
        modalCaption.textContent =
          targetImg.alt || `Projet ${currentImageIndex + 1}`;
      }

      // Injecter le lien vers le site si l'attribut data-link existe
      if (modalLink) {
        if (targetImg.dataset.link) {
          modalLink.href = targetImg.dataset.link;
          modalLink.style.display = "inline-block"; // Afficher le bouton
        } else {
          modalLink.style.display = "none"; // Cacher si pas de lien
        }
      }

      modal.classList.add("show");
    }
  }

  // Image suivante
  function nextImage() {
    if (currentGalleryImages.length > 0) {
      currentImageIndex = (currentImageIndex + 1) % currentGalleryImages.length;
      openModal();
    }
  }

  // Image précédente
  function prevImage() {
    if (currentGalleryImages.length > 0) {
      currentImageIndex =
        (currentImageIndex - 1 + currentGalleryImages.length) %
        currentGalleryImages.length;
      openModal();
    }
  }

  // Événements boutons suivant/précédent
  if (nextBtn) {
    nextBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      nextImage();
    });
  }
  if (prevBtn) {
    prevBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      prevImage();
    });
  }

  // Fermer la Lightbox
  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", () => {
      modal.classList.remove("show");
    });
  }
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (
        e.target === modal ||
        e.target.classList.contains("modal-image-wrapper")
      ) {
        modal.classList.remove("show");
      }
    });
  }

  // Navigation au clavier
  document.addEventListener("keydown", (e) => {
    if (modal && modal.classList.contains("show")) {
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") modal.classList.remove("show");
    }
  });

  // ==========================================
  // 3. CLICS SUR LES IMAGES VISIBLES
  // ==========================================
  document.querySelectorAll("[data-gallery]").forEach((galleryContainer) => {
    const images = Array.from(galleryContainer.querySelectorAll("img"));
    images.forEach((img, index) => {
      img.addEventListener("click", () => {
        currentGalleryImages = images;
        currentImageIndex = index;
        openModal();
      });
    });
  });

  // ==========================================
  // 4. BOUTON "VOIR TOUS LES PROJETS" (Galerie complète)
  // ==========================================
  const btnAllPortfolio = document.getElementById("btn-all-portfolio");
  if (btnAllPortfolio) {
    btnAllPortfolio.addEventListener("click", () => {
      const hiddenImages = Array.from(
        document.querySelectorAll("#data-all-portfolio img"),
      );
      if (hiddenImages.length > 0) {
        currentGalleryImages = hiddenImages;
        currentImageIndex = 0;
        openModal();
      }
    });
  }
});
