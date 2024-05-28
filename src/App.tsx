import React from 'react';

const App = () => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onClickUploader = () => {
    if (!inputRef.current) return;
    inputRef.current?.click();
  };

  return (
    <>
      <input
        className="file-input"
        ref={inputRef}
        type="file"
        accept="image/*"
      />
      <button onClick={onClickUploader}>Upload File</button>
      <div id="preview">미리보기</div>
      <div id="origin">기존 용량</div>
      <div id="compress">압축 용량</div>
    </>
  );
};

export default App;
