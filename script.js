const sealButton = document.getElementById("sealButton");
const envelopeScreen = document.getElementById("envelopeScreen");
const mainPage = document.getElementById("mainPage");
const magicFlash = document.getElementById("magicFlash");
const heroVideo = document.getElementById("heroVideo");

let opened = false;

sealButton.addEventListener("click", () => {
  if (opened) return;
  opened = true;

  sealButton.classList.add("opening");

  createMagicParticles();

  setTimeout(() => {
    magicFlash.classList.add("active");
  }, 900);

 setTimeout(() => {
  envelopeScreen.classList.add("hide");
  mainPage.classList.add("show");
  heroVideo.play();
}, 1250);

  setTimeout(() => {
    envelopeScreen.style.display = "none";
    document.body.style.overflow = "auto";
  }, 2600);
});

function createMagicParticles() {
  createButterflies();
  createMagicDust();
}

function createButterflies() {
  const total = 22;

  for (let i = 0; i < total; i++) {
    const butterfly = document.createElement("span");
    butterfly.classList.add("butterfly");

    butterfly.innerHTML = `
      <span class="wing left-wing"></span>
      <span class="wing right-wing"></span>
      <span class="butterfly-body"></span>
    `;

    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 170 + 80;

    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance - 40;

    const size = Math.random() * 0.45 + 0.55;
    const endSize = size * 1.35;
    const rotate = Math.random() * 360;

    butterfly.style.setProperty("--x", `${x}px`);
    butterfly.style.setProperty("--y", `${y}px`);
    butterfly.style.setProperty("--size", size);
    butterfly.style.setProperty("--endSize", endSize);
    butterfly.style.setProperty("--rotate", `${rotate}deg`);
    butterfly.style.animationDelay = `${Math.random() * .25}s`;

    envelopeScreen.appendChild(butterfly);

    setTimeout(() => butterfly.remove(), 2100);
  }
}

function createMagicDust() {
  const total = 18;

  for (let i = 0; i < total; i++) {
    const dust = document.createElement("span");
    dust.classList.add("magic-dust");

    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 130 + 50;

    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    dust.style.setProperty("--x", `${x}px`);
    dust.style.setProperty("--y", `${y}px`);
    dust.style.animationDelay = `${Math.random() * .3}s`;

    envelopeScreen.appendChild(dust);

    setTimeout(() => dust.remove(), 1500);
  }
}

/*  MUSICA  */
const musicButton = document.getElementById("musicButton");
const bgMusic = document.getElementById("bgMusic");

let isPlaying = false;

musicButton.addEventListener("click", () => {
  if (!isPlaying) {
    bgMusic.play();
    musicButton.classList.add("playing");
    musicButton.querySelector(".music-icon").textContent = "❚❚";
    musicButton.querySelector(".music-text").textContent = "PAUSA";
    isPlaying = true;
  } else {
    bgMusic.pause();
    musicButton.classList.remove("playing");
    musicButton.querySelector(".music-icon").textContent = "▶";
    musicButton.querySelector(".music-text").textContent = "PLAY";
    isPlaying = false;
  }
});

const eventDate = new Date("2026-12-18T15:00:00").getTime(); /*CAMBIAR FECHA AAAA-MM-DDTHH:MM:SS */ 

function updateCountdown() {
  const now = new Date().getTime();
  const distance = eventDate - now;

  if (distance <= 0) {
    document.getElementById("days").textContent = "00";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";
    return;
  }

  document.getElementById("days").textContent = Math.floor(distance / (1000 * 60 * 60 * 24));
  document.getElementById("hours").textContent = Math.floor((distance / (1000 * 60 * 60)) % 24).toString().padStart(2, "0");
  document.getElementById("minutes").textContent = Math.floor((distance / (1000 * 60)) % 60).toString().padStart(2, "0");
  document.getElementById("seconds").textContent = Math.floor((distance / 1000) % 60).toString().padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);
/* GALERIA DE FOTOS */
const galleryPhotos = [
  "images/GALERIA1.png",
  "images/GALERIA2.png",
  "images/GALERIA3.png",
  "images/GALERIA4.png",
  "images/GALERIA5.png"
];

const galleryImage = document.getElementById("galleryImage");
const prevPhoto = document.getElementById("prevPhoto");
const nextPhoto = document.getElementById("nextPhoto");
const galleryDots = document.getElementById("galleryDots");

let currentPhoto = 0;

function createGalleryDots() {
  galleryPhotos.forEach((_, index) => {
    const dot = document.createElement("span");
    if (index === 0) dot.classList.add("active");

    dot.addEventListener("click", () => {
      currentPhoto = index;
      changePhoto();
    });

    galleryDots.appendChild(dot);
  });
}

function changePhoto() {
  galleryImage.classList.add("changing");

  setTimeout(() => {
    galleryImage.src = galleryPhotos[currentPhoto];
    galleryImage.classList.remove("changing");

    document.querySelectorAll(".gallery-dots span").forEach((dot, index) => {
      dot.classList.toggle("active", index === currentPhoto);
    });
  }, 250);
}

nextPhoto.addEventListener("click", () => {
  currentPhoto = (currentPhoto + 1) % galleryPhotos.length;
  changePhoto();
});

prevPhoto.addEventListener("click", () => {
  currentPhoto = (currentPhoto - 1 + galleryPhotos.length) % galleryPhotos.length;
  changePhoto();
});

createGalleryDots();

/*CONFIRMAR ASISTENCIA */
const openRsvpModal = document.getElementById("openRsvpModal");
const closeRsvpModal = document.getElementById("closeRsvpModal");
const rsvpModal = document.getElementById("rsvpModal");
const rsvpForm = document.getElementById("rsvpForm");

const whatsappNumber = "5215541916126"; // cambia este número

openRsvpModal.addEventListener("click", () => {
  rsvpModal.classList.add("active");
});

closeRsvpModal.addEventListener("click", () => {
  rsvpModal.classList.remove("active");
});

rsvpModal.addEventListener("click", (e) => {
  if (e.target === rsvpModal) {
    rsvpModal.classList.remove("active");
  }
});

rsvpForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const attendance = document.getElementById("attendance").value;
  const guestCount = document.getElementById("guestCount").value;

  const message = `Hola, quiero confirmar mi asistencia al cumple de Nahara Zoé.%0A%0AAsistencia: ${attendance}%0ACantidad de personas: ${guestCount}`;

  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${message}`;

  window.open(whatsappURL, "_blank");
});