// js v.1.7.9

const imageInput = document.getElementById("imageInput"); const previewContainer = document.getElementById("previewContainer");

imageInput.addEventListener("change", handleImageUpload);

function handleImageUpload(event) { const files = Array.from(event.target.files); previewContainer.innerHTML = "";

// 최신 업로드 파일이 위에 오도록 순서를 반대로 files.reverse().forEach((file, index) => { const reader = new FileReader(); reader.onload = function (e) { const previewRow = document.createElement("div"); previewRow.className = "preview-row"; previewRow.style.display = "flex"; previewRow.style.alignItems = "center"; previewRow.style.marginBottom = "8px";

const thumbnail = document.createElement("img");
  thumbnail.src = e.target.result;
  thumbnail.style.width = "80px";
  thumbnail.style.height = "60px";
  thumbnail.style.objectFit = "cover";
  thumbnail.style.marginRight = "8px";

  const text1 = document.createElement("span");
  text1.textContent = "기존 숫자";
  text1.style.marginRight = "4px";

  const input1 = document.createElement("input");
  input1.type = "text";
  input1.placeholder = "자동 인식 숫자";
  input1.style.marginRight = "12px";

  const text2 = document.createElement("span");
  text2.textContent = "변경할 숫자";
  text2.style.marginRight = "4px";

  const input2 = document.createElement("input");
  input2.type = "text";
  input2.placeholder = "직접 입력";
  input2.style.marginRight = "12px";

  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = "&#10006;"; // X 아이콘 (유니코드)
  deleteBtn.style.color = "black";
  deleteBtn.style.marginLeft = "auto";
  deleteBtn.style.cursor = "pointer";
  deleteBtn.addEventListener("click", () => {
    previewRow.remove();
  });

  previewRow.appendChild(thumbnail);
  previewRow.appendChild(text1);
  previewRow.appendChild(input1);
  previewRow.appendChild(text2);
  previewRow.appendChild(input2);
  previewRow.appendChild(deleteBtn);

  previewContainer.appendChild(previewRow);

  // 가짜 숫자 인식 시뮬레이션 (실제로는 OCR 사용)
  simulateNumberRecognition(file).then((result) => {
    if (result) {
      input1.value = result;
    } else {
      input1.value = "인식불가";
    }
  });
};
reader.readAsDataURL(file);

}); }

function simulateNumberRecognition(file) { return new Promise((resolve) => { // 임의로 50% 확률로 인식 실패 시뮬레이션 setTimeout(() => { const fail = Math.random() < 0.5; if (fail) resolve(null); else resolve(Math.floor(Math.random() * 100).toString()); }, 300); }); }

// js v.1.7.9

