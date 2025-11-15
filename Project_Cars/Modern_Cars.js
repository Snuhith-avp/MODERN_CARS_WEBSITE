const keywords = ["Engine", "Power", "Torque", "Top Speed", "Notable"];
document.querySelectorAll(".model p").forEach((p) => {
  let html = p.innerHTML;
  keywords.forEach((word) => {
    const regex = new RegExp(word + ":", "g");
    html = html.replace(regex, `<span class="highlight">${word}:</span>`);
  });
  p.innerHTML = html;
});

const form = document.getElementById("inquiryForm");
const popup = document.getElementById("popup");
const closePopup = document.getElementById("closePopup");
const enquireBtns = document.querySelectorAll(".enquire-btn");
const carModelInput = document.getElementById("carModel");
const submitBtn = form.querySelector('button[type="submit"]');
const inquiryForm = document.querySelector(".inquiry-form");

submitBtn.disabled = true;
submitBtn.style.opacity = "0.6";
submitBtn.style.cursor = "not-allowed";

const urlParams = new URLSearchParams(window.location.search);
const carFromURL = urlParams.get("car");

if (carFromURL) {
  carModelInput.value = carFromURL;
  submitBtn.disabled = false;
  submitBtn.style.opacity = "1";
  submitBtn.style.cursor = "pointer";

  window.scrollTo({
    top: form.offsetTop - 80,
    behavior: "smooth",
  });
}

enquireBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const carName = btn.getAttribute("data-car");
    carModelInput.value = carName;

    submitBtn.disabled = false;
    submitBtn.style.opacity = "1";
    submitBtn.style.cursor = "pointer";

    window.scrollTo({
      top: form.offsetTop - 80,
      behavior: "smooth",
    });
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!carModelInput.value.trim()) {
    alert("Please select a car before submitting the inquiry.");
    return;
  }

  inquiryForm.classList.add("hide");
  popup.classList.add("show");
  form.reset();

  submitBtn.disabled = true;
  submitBtn.style.opacity = "0.6";
  submitBtn.style.cursor = "not-allowed";

  setTimeout(() => {
    popup.classList.remove("show");
    inquiryForm.classList.remove("hide");
  }, 3000);
});

closePopup.addEventListener("click", () => {
  popup.classList.remove("show");
});
