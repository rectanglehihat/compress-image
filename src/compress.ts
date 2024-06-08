const compress = (
  file: File,
  quality: number,
  type: string,
): Promise<{
  resizedImage: string;
  fileSize: { origin: number; compress: number };
}> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      canvas.width = img.width;
      canvas.height = img.height;

      if (ctx) {
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(
          blob => {
            if (!blob) {
              reject(new Error('Failed to create blob from canvas'));
              return;
            }
            const resizedImage = URL.createObjectURL(blob);
            const fileSize = { origin: file.size, compress: blob.size };
            resolve({ resizedImage, fileSize });
          },
          `image/${type || '*'}`,
          quality,
        );
      } else {
        reject(new Error('Failed to get canvas context'));
      }
    };

    reader.onload = e => {
      img.src = e.target?.result as string;
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsDataURL(file);
  });
};

export default compress;
