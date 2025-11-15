let allCars = {};

function showLoader() {
  document.getElementById("loader").classList.add("show");
}
function hideLoader() {
  document.getElementById("loader").classList.remove("show");
}

async function loadCars() {
  try {
    showLoader();
    const response = await fetch("car_data_file.json");
    allCars = await response.json();
    renderCars("all");
  } catch (error) {
    console.error("Error loading car_data_file.json:", error);
  } finally {
    setTimeout(hideLoader, 700);
  }
}

function renderCars(brand) {
  const grid = document.getElementById("productGrid");
  grid.innerHTML = "";

  const brandsToRender = brand === "all" ? Object.keys(allCars) : [brand];

  brandsToRender.forEach((b) => {
    allCars[b].forEach((car) => {
      const product = document.createElement("div");
      product.className = `product ${b.toLowerCase()}`;

      // product.style.backgroundColor = car.background_color || "#111";

      product.innerHTML = `
        <img src="${car.image || ""}" alt="${car.model}">
        <h3>${car.model}</h3>
        <p>${car.description}</p>
        <p>Engine: ${car.engine}</p>
        <p>Power: ${car.power}</p>
        <p>Torque: ${car.torque}</p>
        <p>Top Speed: ${car.top_speed}</p>
        <p>Notable: ${car.notable}</p>
        <button class="enquire-btn" data-car="${car.model}">Enquire</button>
      `;
      grid.appendChild(product);
    });
  });

  const keywords = ["Engine", "Power", "Torque", "Top Speed", "Notable"];
  document.querySelectorAll(".product p").forEach((p) => {
    let html = p.innerHTML;
    keywords.forEach((word) => {
      const regex = new RegExp(word + ":", "g");
      html = html.replace(regex, `<span class="highlight">${word}:</span>`);
    });
    p.innerHTML = html;
  });

  const enquireBtns = document.querySelectorAll(".enquire-btn");
  enquireBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const carName = btn.getAttribute("data-car");
      window.location.href = `../Project_Cars/Modern_Cars.html?car=${encodeURIComponent(
        carName
      )}`;
    });
  });
}

function filterBrand(brand) {
  showLoader();
  setTimeout(() => {
    let formattedBrand;

    switch (brand.toLowerCase()) {
      case "ferrari":
        formattedBrand = "Ferrari";
        break;
      case "lamborghini":
        formattedBrand = "Lamborghini";
        break;
      case "bugatti":
        formattedBrand = "Bugatti";
        break;
      case "bmw":
        formattedBrand = "BMW";
        break;
      case "mercedes-benz":
        formattedBrand = "Mercedes-Benz";
        break;
      case "audi":
        formattedBrand = "Audi";
        break;
      case "porsche":
        formattedBrand = "Porsche";
        break;
      case "tesla":
        formattedBrand = "Tesla";
        break;
      case "rolls-royce":
        formattedBrand = "Rolls-Royce";
        break;
      case "aston martin":
        formattedBrand = "Aston Martin";
        break;
      default:
        formattedBrand = "all";
    }

    renderCars(formattedBrand);
    hideLoader();

    const buttons = document.querySelectorAll(".brand-filters button");
    buttons.forEach((btn) => btn.classList.remove("selected"));
    document
      .querySelector(`.brand-filters button[onclick="filterBrand('${brand}')"]`)
      .classList.add("selected");
  }, 600);
}

window.addEventListener("DOMContentLoaded", () => {
  document
    .querySelector(".brand-filters button:first-child")
    .classList.add("selected");
  loadCars();
});
