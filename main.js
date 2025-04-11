// js.v.1.7.9
document.addEventListener("DOMContentLoaded", () => {
  const imageInput = document.getElementById("imageInput");
  const imageInputMobile = document.getElementById("imageInputMobile");
  const dropBox = document.getElementById("dropBox");
  const dropBoxMobile = document.getElementById("dropBoxMobile");
  const previewContainer = document.getElementById("previewContainer");
  const previewContainerMobile = document.getElementById("previewContainerMobile");

  const maxImages = 10;

  const createPreviewRow = (file, container) => {
    const reader = new FileReader();
    reader.onload = () => {
      const row = document.createElement("div");
      row.className = "preview-row";

      const img = document.createElement("img");
      img.src = reader.result;

      const originalText = document.createElement("span");
      originalText.textContent = "기존 숫자";

      const originalInput = document.createElement("input");
      originalInput.type = "text";
      originalInput.placeholder = "자동 인식";

      const newText = document.createElement("span");
      newText.textContent = "변경할 숫자";

      const newInput = document.createElement("input");
      newInput.type = "text";
      newInput.placeholder = "변경할 숫자";

      const removeBtn = document.createElement("span");
      removeBtn.className = "remove";
      removeBtn.textContent = "X";
      removeBtn.onclick = () => container.removeChild(row);

      row.appendChild(img);
      row.appendChild(originalText);
      row.appendChild(originalInput);
      row.appendChild(newText);
      row.appendChild(newInput);
      row.appendChild(removeBtn);

      container.prepend(row); // 최신 업로드가 위로
    };
    reader.readAsDataURL(file);
  };

  const handleFiles = (files, container) => {
    const currentCount = container.children.length;
    if (currentCount + files.length > maxImages) {
      alert("최대 10개의 이미지만 업로드 가능합니다.");
      return;
    }
    Array.from(files).forEach(file => createPreviewRow(file, container));
  };

  imageInput.addEventListener("change", (e) => {
    handleFiles(e.target.files, previewContainer);
  });

  imageInputMobile.addEventListener("change", (e) => {
    handleFiles(e.target.files, previewContainerMobile);
  });

  dropBox.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropBox.style.borderColor = "#000";
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
    dropBoxMobile.style.borderColor = "#000";
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
// js.v.1.7.9
