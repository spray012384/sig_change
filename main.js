// js v.1.7.9

function handleImageUpload(inputElement, previewContainerId) {
  const files = Array.from(inputElement.files);
  const previewContainer = document.getElementById(previewContainerId);

  if (!files.length) return;

  previewContainer.innerHTML = ""; // Clear previous previews

  files.reverse().forEach((file) => {
    const reader = new FileReader();
    reader.onload = function (event) {
      const imageSrc = event.target.result;

      // OCR 처리
      Tesseract.recognize(imageSrc, "eng", { logger: (m) => console.log(m) })
        .then(({ data: { text } }) => {
          let extractedNumber = text.match(/\d+/g);
          extractedNumber = extractedNumber ? extractedNumber[0] : "인식불가";

          const row = document.createElement("div");
          row.className = "preview-row";

          row.innerHTML = `
            <img src="${imageSrc}" />
            <span>기존 숫자</span>
            <input type="text" value="${extractedNumber}" />
            <span>변경할 숫자</span>
            <input type="text" placeholder="숫자 입력" />
            <span class="remove">×</span>
          `;

          row.querySelector(".remove").addEventListener("click", () => {
            row.remove();
          });

          previewContainer.appendChild(row);
        });
    };
    reader.readAsDataURL(file);
  });
}

document.getElementById("imageInput").addEventListener("change", function () {
  handleImageUpload(this, "previewContainer");
});

document.getElementById("imageInputMobile").addEventListener("change", function () {
  handleImageUpload(this, "previewContainerMobile");
});
