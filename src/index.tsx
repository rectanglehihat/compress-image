import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import compressImage from './compressImage.ts';

interface CompressImageUploaderProps {
  quality?: number;
  type?: string;
  style?: { [key: string]: string };
  accept?: string;
  children?: React.ReactNode;
}

const CompressImageUploader = ({
  quality = 0.7,
  type = 'jpeg',
  style,
  accept = 'image/*',
  children,
}: CompressImageUploaderProps) => {
  const [previewImage, setPreviewImage] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

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
      return fileSize;
    } catch (error) {
      console.error('Error compressing image:', error);
    }
  };

  const onClickUploadButton = () => {
    inputRef.current?.click();
  };

  useEffect(() => {
    if (previewImage === null) {
      setPreviewImage('');
    }
  }, [previewImage]);

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={onChangeFileInput}
        style={{ display: 'none' }}
      />
      <button
        onClick={onClickUploadButton}
        style={{
          background: '#fff',
          border: 'none',
          padding: '0',
          cursor: 'pointer',
        }}
      >
        {previewImage ? (
          <img style={style} src={previewImage} alt="preview-image" />
        ) : children ? (
          children
        ) : (
          'Upload File'
        )}
      </button>
    </>
  );
};

export default CompressImageUploader;
