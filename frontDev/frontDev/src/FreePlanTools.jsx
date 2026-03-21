import { useEffect, useRef, useState } from 'react';
import './FreePlanTools.css';

function FreePlanTools({ resetTrigger }) {
  const [isListening, setIsListening] = useState(false);
  const [uploadedImageName, setUploadedImageName] = useState('');
  const imageInputRef = useRef(null);

  useEffect(() => {
    setIsListening(false);
    setUploadedImageName('');
    if (imageInputRef.current) {
      imageInputRef.current.value = '';
    }
  }, [resetTrigger]);

  const toggleMic = () => {
    setIsListening((prev) => !prev);
  };

  const handleImageSelect = (event) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;
    setUploadedImageName(selectedFile.name);
  };

  return (
    <>
      <div className="free-tools-row">
        <button
          className={`tool-btn ${isListening ? 'active' : ''}`}
          type="button"
          onClick={toggleMic}
          aria-pressed={isListening}
          title="Audio input"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M12 14C13.66 14 15 12.66 15 11V5C15 3.34 13.66 2 12 2C10.34 2 9 3.34 9 5V11C9 12.66 10.34 14 12 14Z" fill="currentColor"/>
            <path d="M19 11C19 14.53 16.39 17.43 13 17.93V21H11V17.93C7.61 17.43 5 14.53 5 11H7C7 13.76 9.24 16 12 16C14.76 16 17 13.76 17 11H19Z" fill="currentColor"/>
          </svg>
          Mic
        </button>

        <button
          className="tool-btn"
          type="button"
          onClick={() => imageInputRef.current?.click()}
          title="Image to text"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M21 19V5C21 3.9 20.1 3 19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19ZM8.5 11.5L11 14.51L14.5 10L19 16H5L8.5 11.5Z" fill="currentColor"/>
          </svg>
          Image
        </button>

        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageSelect}
          style={{ display: 'none' }}
        />
      </div>

      {isListening ? <p className="free-tool-note">🎙️ Mic active (limited access)</p> : null}
      {uploadedImageName ? <p className="free-tool-note">🖼️ Selected image: {uploadedImageName}</p> : null}
    </>
  );
}

export default FreePlanTools;
