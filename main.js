// js.1.7.9

document.addEventListener("DOMContentLoaded", () => {
  const imageInput = document.getElementById("imageInput");
  const dropBox = document.getElementById("dropBox");
  const previewContainer = document.getElementById("previewContainer");

  const imageInputMobile = document.getElementById("imageInputMobile");
  const dropBoxMobile = document.getElementById("dropBoxMobile");
  const previewContainerMobile = document.getElementById("previewContainerMobile");

  const MAX_IMAGES = 10;

  function createPreviewRow(file, container) {
    const reader = new FileReader();
    reader.onload = () => {
      const row = document.createElement("div");
      row.className = "preview-row";

      const img = document.createElement("img");
      img.src = reader.result;

      const originalLabel = document.createElement("span");
      originalLabel.textContent = "기존 숫자:";

      const originalInput = document.createElement("input");
      originalInput.placeholder = "인식 중...";
      originalInput.value = "인식불가"; // 기본값

      const updateLabel = document.createElement("span");
      updateLabel.textContent = "변경할 숫자:";

      const updateInput = document.createElement("input");
      updateInput.placeholder = "입력";

      const remove = document.createElement("span");
      remove.textContent = "X";
      remove.className = "remove";
      remove.onclick = () => row.remove();

      row.append(img, originalLabel, originalInput, updateLabel, updateInput, remove);

      // 새로운 항목이 위로 가도록 prepend
      container.prepend(row);

      // OCR 시도
      Tesseract.recognize(reader.result, "eng", {
        logger: (m) => console.log(m),
      }).then(({ data: { text } }) => {
        const matched = text.match(/\d+/);
        if (matched) {
          originalInput.value = matched[0];
        }
      });
    };
    reader.readAsDataURL(file);
  }

  function handleFiles(files, container) {
    const validFiles = Array.from(files).slice(0, MAX_IMAGES);
    validFiles.forEach((file) => createPreviewRow(file, container));
  }

  imageInput.addEventListener("change", () => {
    handleFiles(imageInput.files, previewContainer);
  });

  imageInputMobile.addEventListener("change", () => {
    handleFiles(imageInputMobile.files, previewContainerMobile);
  });

  dropBox.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropBox.style.borderColor = "#007bff";
  });

  dropBox.addEventListener("dragleave", () => {
    dropBox.style.borderColor = "#aaa";
  });

  dropBox.addEventListener("drop", (e) => {
    e.preventDefault();
    dropBox.style.borderColor = "#aaa";
    handleFiles(e.dataTransfer.files, previewContainer);
  });

  dropBoxMobile.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropBoxMobile.style.borderColor = "#007bff";
  });

  dropBoxMobile.addEventListener("dragleave", () => {
    dropBoxMobile.style.borderColor = "#aaa";
  });

  dropBoxMobile.addEventListener("drop", (e) => {
    e.preventDefault();
    dropBoxMobile.style.borderColor = "#aaa";
    handleFiles(e.dataTransfer.files, previewContainerMobile);
  });
});

// js.1.7.9
