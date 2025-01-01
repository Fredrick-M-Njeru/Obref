const btn = document.querySelector('.btn');
btn.addEventListener('click', () => {
  console.log("button has been clicked");
})
document.addEventListener("DOMContentLoaded", () => {
  // Select all images you want to be replaceable
  const images = document.querySelectorAll("img");

  // Add a dropzone area for instructions
  const dropZone = document.createElement("div");


  document.body.insertBefore(dropZone, document.body.firstChild);

  // Prevent default drag behavior for drop events
  ["dragenter", "dragover", "dragleave", "drop"].forEach(eventType => {
      images.forEach(img => {
          img.addEventListener(eventType, e => e.preventDefault());
      });
  });

  // Handle image drop on each image
  images.forEach(img => {
      img.addEventListener("dragover", (event) => {
          event.preventDefault();
          img.style.border = "2px solid #007bff"; // Highlight image on dragover
      });

      img.addEventListener("dragleave", () => {
          img.style.border = ""; // Reset border when leaving
      });

      img.addEventListener("drop", (event) => {
          img.style.border = ""; // Reset the border
          const file = event.dataTransfer.files[0];

          if (file && file.type.startsWith("image/")) {
              const reader = new FileReader();
              reader.onload = (e) => {
                  img.src = e.target.result; // Change only the source of the hovered image
              };
              reader.readAsDataURL(file);
          } else {
              alert("Please drop a valid image file.");
          }
      });
  });
});

