const $fileInput = document.getElementById('fileInput') as HTMLInputElement;
const $preview = document.getElementById('preview') as HTMLDivElement;
const $origin = document.getElementById('origin') as HTMLDivElement;
const $compress = document.getElementById('compress') as HTMLDivElement;
const $uploadButton = document.getElementById(
  'uploadButton',
) as HTMLButtonElement;

$fileInput.addEventListener('change', () => {
  const files = $fileInput.files;
  if (files && files.length > 0) {
    const file = files[0];
    const quality = 0.7;
    try {
      compressImage(file, quality);
    } catch (error) {
      console.error('error', error);
    }
  }
});

$uploadButton.addEventListener('click', () => {
  $fileInput.click();
});

function compressImage(file: File, quality: number): void {
  const reader = new FileReader();
  const img = new Image();

  img.onload = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = img.width;
    canvas.height = img.height;

    ctx?.drawImage(img, 0, 0);
    canvas.toBlob(
      blob => {
        if (!blob) return;

        const resizedImage = URL.createObjectURL(blob);
        $preview.innerHTML = `<img src="${resizedImage}" alt="File Preview" style="max-width: 100%; height: auto;">`;
        $origin.innerText = `Origin: ${file.size} bytes`;
        $compress.innerText = `Compress: ${blob.size} bytes`;
      },
      'image/jpeg',
      quality,
    );
  };

  reader.onload = e => {
    img.src = e.target?.result as string;
  };

  return reader.readAsDataURL(file);
}
