// main.js
const MAX_FILES = 10;
const uploadedFilesPC = [];
const uploadedFilesMobile = [];

function isDuplicate(file, uploadedList) {
  return uploadedList.some(f => f.name === file.name && f.size === file.size);
}

function handleFiles(files, previewContainer, uploadedList) {
  const fileArray = Array.from(files);

  fileArray.forEach((file) => {
    if (uploadedList.length >= MAX_FILES) return;

    if (isDuplicate(file, uploadedList)) {
      // 이미 업로드한 파일이면 그대로 다시 추가
    }

    uploadedList.push(file);

    const reader = new FileReader();
    reader.onload = function (e) {
      const row = document.createElement("div");
      row.className = "preview-row";

      // OCR 기능 들어갈 자리 - 현재는 인식불가로 처리
      const recognizedText = "인식불가";

      row.innerHTML = `
        <img src="${e.target.result}" alt="preview" />
        <span>기존 숫자</span><input type="text" value="${recognizedText}" />
        <span>수정할 숫자</span><input type="text" value="" />
        <span class="remove">✕</span>
      `;
      row.querySelector(".remove").onclick = () => {
        previewContainer.removeChild(row);
        const index = uploadedList.indexOf(file);
        if (index > -1) uploadedList.splice(index, 1);
      };
      previewContainer.appendChild(row);
    };
    reader.readAsDataURL(file);
  });
}

// PC 업로드
document.getElementById("imageInput").addEventListener("change", function () {
  handleFiles(this.files, document.getElementById("previewContainer"), uploadedFilesPC);
  this.value = ''; // 같은 파일 다시 업로드 가능하게 초기화
});

// PC 드래그앤드롭
document.getElementById("dropBox").addEventListener("dragover", function (e) {
  e.preventDefault();
});
document.getElementById("dropBox").addEventListener("drop", function (e) {
  e.preventDefault();
  handleFiles(e.dataTransfer.files, document.getElementById("previewContainer"), uploadedFilesPC);
});

// 모바일 업로드
document.getElementById("imageInputMobile").addEventListener("change", function () {
  handleFiles(this.files, document.getElementById("previewContainerMobile"), uploadedFilesMobile);
  this.value = ''; // 같은 파일 다시 업로드 가능하게 초기화
});

// 모바일 드래그앤드롭
document.getElementById("dropBoxMobile").addEventListener("dragover", function (e) {
  e.preventDefault();
});
document.getElementById("dropBoxMobile").addEventListener("drop", function (e) {
  e.preventDefault();
  handleFiles(e.dataTransfer.files, document.getElementById("previewContainerMobile"), uploadedFilesMobile);
});
