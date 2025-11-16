// Load images from JSON file
fetch("images.json")
  .then(response => response.json())
  .then(data => {
    const gallery = document.getElementById("gallery");

    data.images.forEach(url => {
      const img = document.createElement("img");
      img.src = url;
      // img.loading = "lazy";
      gallery.appendChild(img);
    });
  })
  .catch(error => console.error("Error loading images:", error));
