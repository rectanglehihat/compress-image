import React, { ChangeEvent, useRef, useState } from 'react';
import compress from './compress.ts';

interface AppProps {
  width?: number;
  height?: number;
  quality?: number;
  type?: string;
  style?: string;
  accept?: string;
}

const App = ({
  width = 300,
  height = 300,
  quality = 0.7,
  type = 'jpeg',
  accept = 'image/*',
}: AppProps) => {
  const [previewImage, setPreviewImage] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const onChangeFileInput = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];

    try {
      const { resizedImage, fileSize } = await compress(file, quality, type);
      setPreviewImage(resizedImage);
      console.log('기존 용량', fileSize.origin);
      console.log('압축 용량', fileSize.compress);
    } catch (error) {
      console.error('Error compressing image:', error);
    }
  };

  const onClickUploadButton = () => {
    inputRef.current?.click();
  };

  return (
    <>
      <input
        className="file-input"
        ref={inputRef}
        type="file"
        accept={accept}
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
    </>
  );
};

export default App;
