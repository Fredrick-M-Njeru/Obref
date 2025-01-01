document.addEventListener("DOMContentLoaded", () => {

  // all images i want to be replaceable
  const images = document.querySelectorAll("img");



  // Make the text editable
  const allTextElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, div');
  allTextElements.forEach(element => {
    element.setAttribute('contenteditable', 'true');
  });

  // Prevent default drag behavior for drop events on images
  ["dragenter", "dragover", "dragleave", "drop"].forEach(eventType => {
    images.forEach(img => {
      img.addEventListener(eventType, e => e.preventDefault());
    });
  });

  // Handle image drop on each image
  images.forEach(img => {
    img.addEventListener("dragover", (event) => {
      event.preventDefault();
      img.style.border = "2px solid #007bff";
    });

    img.addEventListener("dragleave", () => {
      img.style.border = "";
    });

    img.addEventListener("drop", (event) => {
      img.style.border = "";
      const file = event.dataTransfer.files[0];

      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          // Change only the source of the hovered image
          img.src = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        alert("Please drop a valid image file.");
      }
    });
  });

  // Handle drop on dropzone 
  dropZone.addEventListener("drop", (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        // the dropped image:
        const newImage = document.createElement("img");
        newImage.src = e.target.result;
        // Append the new image
        document.body.appendChild(newImage);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please drop a valid image file.");
    }
  });

  dropZone.addEventListener("dragover", (event) => {
    event.preventDefault();
    // Highlight dropzone
    dropZone.style.backgroundColor = "#f0f8ff";
  });

  dropZone.addEventListener("dragleave", () => {
    // Reset dropzone highlight
    dropZone.style.backgroundColor = "";
  });
});
