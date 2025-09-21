let popup = document.getElementById("popup");

function openPopup() {
  popup.classList.add("open-popup");
}

function closePopup() {
  popup.classList.remove("open-popup");
}

function openNewNotePopup() {
  popup2.classList.add("open-popup2");
}

function closeNewNotePopup() {
  popup2.classList.remove("open-popup2");
}

function enlargeCard(subject) {
  const card = document.getElementById(subject);
  if (!card) return;

  card.style.transition = "transform 0.2s ease, opacity 0.2s ease";
  card.style.transform = "scale(9)";
  card.style.opacity = "0";
  card.style.zIndex = "1000";
  card.style.width = "100%";
  card.style.height = "100%";

  // Redirect after animation
  setTimeout(() => {
    window.location.href = `dashboard.html?subject=${subject}`;
  }, 700);
}

