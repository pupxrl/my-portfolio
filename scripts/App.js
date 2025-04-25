function togglePopup() {
  const popup = document.getElementById("popup");
  popup.style.display = popup.style.display === "flex" ? "none" : "flex";
}

window.onclick = function (e) {
  const popup = document.getElementById("popup");
  const popupBox = document.querySelector(".popup-box");
  if (e.target === popup) {
    popup.style.display = "none";
  }
};