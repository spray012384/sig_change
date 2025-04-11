// v.1.7.8

// 이미지 업로드 및 미리보기 핸들링 const imageInput = document.getElementById("imageInput"); const dropBox = document.getElementById("dropBox"); const previewContainer = document.getElementById("previewContainer");

const imageInputMobile = document.getElementById("imageInputMobile"); const dropBoxMobile = document.getElementById("dropBoxMobile"); const previewContainerMobile = document.getElementById("previewContainerMobile");

function handleFiles(files, isMobile = false) { const container = isMobile ? previewContainerMobile : previewContainer; container.innerHTML = ""; // 초기화 const fileArray = Array.from(files).slice(0, 10).reverse();

fileArray.forEach((file, index) => { const reader = new FileReader(); reader.onload = (e) => { const previewRow = document.createElement("div"); previewRow.className = "preview-row";

const img = document.createElement("img");
  img.src = e.target.result;
  img.style.width = "80px";
  img.style.height = "60px";
  img.style.objectFit = "cover";

  const originText = document.createElement("span");
  originText.textContent = "기존 숫자";
  originText.style.width = "60px";

  const originInput = document.createElement("input");
  originInput.placeholder = "인식 중...";

  const newText = document.createElement("span");
  newText.textContent = "변경할 숫자";
  newText.style.width = "80px";

  const newInput = document.createElement("input");
  newInput.placeholder = "입력";

  const removeBtn = document.createElement("span");
  removeBtn.className = "remove";
  removeBtn.textContent = "X";
  removeBtn.onclick = () => {
    container.removeChild(previewRow);
  };

  previewRow.appendChild(img);
  previewRow.appendChild(originText);
  previewRow.appendChild(originInput);
  previewRow.appendChild(newText);
  previewRow.appendChild(newInput);
  previewRow.appendChild(removeBtn);

  container.appendChild(previewRow);

  Tesseract.recognize(
    file,
    "eng",
    {
      logger: (m) => console.log(m)
    }
  ).then(({ data: { text } }) => {
    const matched = text.match(/\d+/);
    if (matched) {
      originInput.value = matched[0];
    } else {
      originInput.value = "인식불가";
    }
  });
};
reader.readAsDataURL(file);

}); }

imageInput.addEventListener("change", (e) => handleFiles(e.target.files)); dropBox.addEventListener("dragover", (e) => { e.preventDefault(); dropBox.style.borderColor = "#000"; }); dropBox.addEventListener("dragleave", () => { dropBox.style.borderColor = "#aaa"; }); dropBox.addEventListener("drop", (e) => { e.preventDefault(); dropBox.style.borderColor = "#aaa"; handleFiles(e.dataTransfer.files); });

imageInputMobile.addEventListener("change", (e) => handleFiles(e.target.files, true)); dropBoxMobile.addEventListener("dragover", (e) => { e.preventDefault(); dropBoxMobile.style.borderColor = "#000"; }); dropBoxMobile.addEventListener("dragleave", () => { dropBoxMobile.style.borderColor = "#aaa"; }); dropBoxMobile.addEventListener("drop", (e) => { e.preventDefault(); dropBoxMobile.style.borderColor = "#aaa"; handleFiles(e.dataTransfer.files, true); });

// v.1.7.8

