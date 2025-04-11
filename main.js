// js.v.1.7.9

function handleImageUpload(input, containerId, isMobile = false) { const files = Array.from(input.files).reverse(); const previewContainer = document.getElementById(containerId);

files.forEach((file, index) => { const reader = new FileReader(); reader.onload = function (event) { const imageUrl = event.target.result;

const row = document.createElement("div");
  row.className = "preview-row";

  const img = document.createElement("img");
  img.src = imageUrl;

  const originalLabel = document.createElement("span");
  originalLabel.textContent = "기존 숫자";

  const originalInput = document.createElement("input");
  originalInput.placeholder = "추출중...";

  const newLabel = document.createElement("span");
  newLabel.textContent = "변경할 숫자";

  const newInput = document.createElement("input");
  newInput.placeholder = "직접 입력";

  const removeBtn = document.createElement("span");
  removeBtn.className = "remove";
  removeBtn.textContent = "X";
  removeBtn.onclick = () => row.remove();

  row.appendChild(img);
  row.appendChild(originalLabel);
  row.appendChild(originalInput);
  row.appendChild(newLabel);
  row.appendChild(newInput);
  row.appendChild(removeBtn);

  previewContainer.insertBefore(row, previewContainer.firstChild);

  Tesseract.recognize(imageUrl, 'eng', { logger: m => console.log(m) })
    .then(({ data: { text } }) => {
      originalInput.value = text.trim();
    })
    .catch(() => {
      originalInput.value = "인식불가";
    });
};
reader.readAsDataURL(file);

}); }

document.getElementById("imageInput").addEventListener("change", (e) => { handleImageUpload(e.target, "previewContainer"); });

document.getElementById("dropBox").addEventListener("dragover", (e) => { e.preventDefault(); });

document.getElementById("dropBox").addEventListener("drop", (e) => { e.preventDefault(); handleImageUpload({ files: e.dataTransfer.files }, "previewContainer"); });

document.getElementById("imageInputMobile").addEventListener("change", (e) => { handleImageUpload(e.target, "previewContainerMobile", true); });

document.getElementById("dropBoxMobile").addEventListener("dragover", (e) => { e.preventDefault(); });

document.getElementById("dropBoxMobile").addEventListener("drop", (e) => { e.preventDefault(); handleImageUpload({ files: e.dataTransfer.files }, "previewContainerMobile", true); });

// js.v.1.7.9

