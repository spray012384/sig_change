const imageInput = document.getElementById('imageInput');
const previewContainer = document.getElementById('previewContainer');

// 이미지 파일 고유 hash 생성을 위한 Map
const uploadedMap = new Map();

imageInput.addEventListener('change', async (event) => {
  const files = Array.from(event.target.files);
  for (const file of files) {
    const fileKey = await getFileHash(file);

    // 이미 동일 파일이 업로드 되었는지 체크
    if (!uploadedMap.has(fileKey)) {
      uploadedMap.set(fileKey, file.name);

      const url = URL.createObjectURL(file);
      const ocrResult = await simulateOCR(file); // 실제 OCR 함수로 대체 가능

      const wrapper = document.createElement('div');
      wrapper.className = 'image-preview';

      const img = document.createElement('img');
      img.src = url;

      const span = document.createElement('span');
      span.className = 'ocr-result';
      span.textContent = ocrResult || '인식불가';

      const btn = document.createElement('button');
      btn.className = 'remove-btn';
      btn.textContent = '삭제';
      btn.addEventListener('click', () => {
        previewContainer.removeChild(wrapper);
        uploadedMap.delete(fileKey);
      });

      wrapper.appendChild(img);
      wrapper.appendChild(span);
      wrapper.appendChild(btn);

      previewContainer.prepend(wrapper);
    }
  }

  // 동일 파일 재업로드 가능하게 input 초기화
  event.target.value = '';
});

// 이미지 해시 생성
async function getFileHash(file) {
  const arrayBuffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// OCR 시뮬레이션 함수
async function simulateOCR(file) {
  return new Promise((resolve) => {
    // 파일명에 숫자가 있다면 그걸 추출해서 리턴
    const match = file.name.match(/\d+/);
    resolve(match ? match[0] : '');
  });
}
