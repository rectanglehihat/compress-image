import React, { ChangeEvent, useRef, useState } from 'react';

const compressImage = (
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

interface AppProps {
  width?: number;
  height?: number;
  quality?: number;
  type?: string;
  style?: string;
}

const App = ({
  width = 300,
  height = 300,
  quality = 0.7,
  type = 'jpeg',
}: AppProps) => {
  const [previewImage, setPreviewImage] = useState<string>('');
  const [fileSize, setFileSize] = useState({ origin: 0, compress: 0 });
  const $inputRef = useRef<HTMLInputElement>(null);

  const onChangeFileInput = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];

    try {
      const { resizedImage, fileSize } = await compressImage(
        file,
        quality,
        type,
      );
      setPreviewImage(resizedImage);
      setFileSize(fileSize);
    } catch (error) {
      console.error('Error compressing image:', error);
    }
  };

  const onClickUploadButton = () => {
    if (!$inputRef.current) return;
    $inputRef.current.click();
  };

  return (
    <>
      <input
        className="file-input"
        ref={$inputRef}
        type="file"
        accept="image/*"
        onChange={onChangeFileInput}
      />
      <button className="upload-button" onClick={onClickUploadButton}>
        Upload File
      </button>
      {previewImage && (
        <img
          className="preview-image"
          style={{ width: `${width}px`, height: `${height}px` }}
          src={previewImage}
          alt="preview-image"
        />
      )}
      <div className="origin-size">기존 용량: {fileSize.origin}</div>
      <div className="compress-size">압축 용량: {fileSize.compress}</div>
    </>
  );
};

export default App;
