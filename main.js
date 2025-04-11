const MAX_FILES = 10;
const uploadedFilesPC = [];
const uploadedFilesMobile = [];

function handleFiles(files, previewContainer, fileStore) {
  const newFiles = Array.from(files);
  for (const file of newFiles) {
    if (fileStore.length >= MAX_FILES) {
      alert("최대 10개까지 업로드 가능합니다.");
      return;
    }
    fileStore.push(file);
    const reader = new FileReader();
    reader.onload = function (e) {
      const imgDataUrl = e.target.result;
      const row = document.createElement("div");
      row.className = "preview-row";
      row.innerHTML = `
        <img src="${imgDataUrl}" alt="preview" />
        <span>기존 숫자</span><input type="text" value="인식 중..." readonly />
        <span>수정할 숫자</span><input type="text" value="" />
        <span class="remove">✕</span>
      `;
      const inputField = row.querySelector("input[type='text']");
      row.querySelector(".remove").onclick = () => {
        previewContainer.removeChild(row);
        const index = fileStore.indexOf(file);
        if (index > -1) fileStore.splice(index, 1);
      };
      previewContainer.appendChild(row);

      // OCR 숫자 인식
      Tesseract.recognize(imgDataUrl, 'eng', { logger: m => {} })
        .then(({ data: { text } }) => {
          const num = text.trim().match(/\d+/);
          inputField.value = num ? num[0] : "인식불가";
        })
        .catch(() => {
          inputField.value = "인식불가";
        });
    };
    reader.readAsDataURL(file);
  }
}

// PC 업로드
document.getElementById("imageInput").addEventListener("change", function () {
  handleFiles(this.files, document.getElementById("previewContainer"), uploadedFilesPC);
});

// PC 드래그 드롭
document.getElementById("dropBox").addEventListener("dragover", e => e.preventDefault());
document.getElementById("dropBox").addEventListener("drop", function (e) {
  e.preventDefault();
  handleFiles(e.dataTransfer.files, document.getElementById("previewContainer"), uploadedFilesPC);
});

// Mobile 업로드
document.getElementById("imageInputMobile").addEventListener("change", function () {
  handleFiles(this.files, document.getElementById("previewContainerMobile"), uploadedFilesMobile);
});

// Mobile 드래그 드롭
document.getElementById("dropBoxMobile").addEventListener("dragover", e => e.preventDefault());
document.getElementById("dropBoxMobile").addEventListener("drop", function (e) {
  e.preventDefault();
  handleFiles(e.dataTransfer.files, document.getElementById("previewContainerMobile"), uploadedFilesMobile);
});
