import { useEffect, useRef, useState } from 'react';
import './FreePlanTools.css';

function FreePlanTools({ resetTrigger, showAdvanced = false }) {
  const [isListening, setIsListening] = useState(false);
  const [uploadedImageName, setUploadedImageName] = useState('');
  const [uploadedDocumentName, setUploadedDocumentName] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const imageInputRef = useRef(null);
  const documentInputRef = useRef(null);

  useEffect(() => {
    setIsListening(false);
    setUploadedImageName('');
    setUploadedDocumentName('');
    setWebsiteUrl('');
    if (imageInputRef.current) {
      imageInputRef.current.value = '';
    }
    if (documentInputRef.current) {
      documentInputRef.current.value = '';
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

  const handleDocumentSelect = (event) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;
    setUploadedDocumentName(selectedFile.name);
  };

  const handleWebsiteInput = () => {
    const value = window.prompt('Enter website URL');
    if (!value) return;
    setWebsiteUrl(value.trim());
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

        {showAdvanced ? (
          <>
            <button
              className="tool-btn"
              type="button"
              onClick={() => documentInputRef.current?.click()}
              title="Document translation"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2ZM15 9V3.5L18.5 9H15Z" fill="currentColor"/>
              </svg>
              Document
            </button>

            <button
              className="tool-btn"
              type="button"
              onClick={handleWebsiteInput}
              title="Website translation"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM4.9 10H9.2C9.38 8.52 9.73 7.16 10.24 6C7.57 6.67 5.48 8.11 4.9 10ZM4.9 14C5.48 15.89 7.57 17.33 10.24 18C9.73 16.84 9.38 15.48 9.2 14H4.9ZM12 18.4C11.36 17.44 10.86 15.86 10.66 14H13.34C13.14 15.86 12.64 17.44 12 18.4ZM10.66 10C10.86 8.14 11.36 6.56 12 5.6C12.64 6.56 13.14 8.14 13.34 10H10.66ZM13.76 18C14.27 16.84 14.62 15.48 14.8 14H19.1C18.52 15.89 16.43 17.33 13.76 18ZM14.8 10C14.62 8.52 14.27 7.16 13.76 6C16.43 6.67 18.52 8.11 19.1 10H14.8ZM10.66 12C10.64 12.34 10.63 12.67 10.63 13H13.37C13.37 12.67 13.36 12.34 13.34 12H10.66Z" fill="currentColor"/>
              </svg>
              Website
            </button>
          </>
        ) : null}

        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageSelect}
          style={{ display: 'none' }}
        />

        <input
          ref={documentInputRef}
          type="file"
          accept=".pdf,.doc,.docx,.txt,.ppt,.pptx,.xls,.xlsx"
          onChange={handleDocumentSelect}
          style={{ display: 'none' }}
        />
      </div>

      {isListening ? <p className="free-tool-note">🎙️ Mic active (limited access)</p> : null}
      {uploadedImageName ? <p className="free-tool-note">🖼️ Selected image: {uploadedImageName}</p> : null}
      {showAdvanced && uploadedDocumentName ? <p className="free-tool-note">📄 Selected document: {uploadedDocumentName}</p> : null}
      {showAdvanced && websiteUrl ? <p className="free-tool-note">🌐 Website: {websiteUrl}</p> : null}
    </>
  );
}

export default FreePlanTools;
