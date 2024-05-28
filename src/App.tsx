import React from 'react';

const App = () => {
  const [previewImage, setPreviewImage] = React.useState<string>('');
  const [fileSize, setFileSize] = React.useState({ origin: 0, compress: 0 });
  const $inputRef = React.useRef<HTMLInputElement>(null);

  const onChangeFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const quality = 0.7;
    try {
      compressImage(file, quality);
    } catch (error) {
      console.error('error', error);
    }
  };

  const onClickUploadButton = () => {
    if (!$inputRef.current) return;
    $inputRef.current.click();
  };

  const compressImage = (file: File, quality: number): void => {
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
          setPreviewImage(resizedImage);
          setFileSize({ origin: file.size, compress: blob.size });
        },
        'image/jpeg',
        quality,
      );
    };

    reader.onload = e => {
      img.src = e.target?.result as string;
    };

    return reader.readAsDataURL(file);
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
      <img className="preview-image" src={previewImage} alt="preview-image" />
      <div className="origin-size">기존 용량: {fileSize.origin}</div>
      <div className="compress-size">압축 용량: {fileSize.compress}</div>
    </>
  );
};

export default App;
