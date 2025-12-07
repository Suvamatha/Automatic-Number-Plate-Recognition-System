import { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { useDropzone } from 'react-dropzone';
import { Upload, Camera, ScanLine, Shield } from 'lucide-react';
import './App.css';

function App() {
  const [image, setImage] = useState<string | null>(null);
  const [mode, setMode] = useState<'upload' | 'live'>('upload');
  const webcamRef = useRef<Webcam>(null);

  const onDrop = (files: File[]) => {
    if (files[0]) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result as string);
      reader.readAsDataURL(files[0]);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] },
    maxFiles: 1,
  });

  const capture = () => {
    const shot = webcamRef.current?.getScreenshot();
    if (shot) {
      setImage(shot);
      setMode('upload');
    }
  };

  const scan = () => {
    if (image) {
      alert('Image sent to backend for ANPR processing...');
      // Connect to your backend here later
    }
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-inner">
          <div className="logo">
            <Shield size={36} className="shield-icon" />
            <span className="logo-text">ANPR System</span>
          </div>
          <div className="nav-buttons">
            <button className="nav-btn active">
              <Camera size={18} /> Scanner
            </button>
            <button className="nav-btn">Dashboard</button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="main">
        <div className="hero">
          <h1>
            Automatic <span className="cyan">Number Plate</span>
            <br />
            Recognition System
          </h1>
          <p className="subtitle">
            Upload an image or capture from webcam to instantly detect and read vehicle number plates.
          </p>
        </div>

        {/* Mode Switch */}
        <div className="mode-switch">
          <button
            className={mode === 'upload' ? 'mode-btn active' : 'mode-btn'}
            onClick={() => setMode('upload')}
          >
            <Upload size={20} /> Upload Image
          </button>
          <button
            className={mode === 'live' ? 'mode-btn active' : 'mode-btn'}
            onClick={() => setMode('live')}
          >
            <Camera size={20} /> Live Capture
          </button>
        </div>

        {/* Upload / Webcam Area */}
        <div className="upload-box">
          {mode === 'upload' ? (
            <div {...getRootProps()} className="drop-area">
              <input {...getInputProps()} />
              <div className="upload-circle">
                <Upload size={48} className="upload-arrow" />
              </div>
              <p className="drop-text">
                {isDragActive ? 'Drop the image here...' : 'Drag & drop an image'}
              </p>
              <p className="drop-subtext">or click to browse files</p>
              <p className="formats">Supports: JPG, PNG, WEBP</p>
            </div>
          ) : (
            <div className="webcam-wrapper">
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="webcam-feed"
                videoConstraints={{ facingMode: "environment" }}
              />
              <button onClick={capture} className="capture-btn">
                Capture Photo
              </button>
            </div>
          )}
        </div>

        {/* Preview */}
        {image && (
          <div className="preview">
            <img src={image} alt="Captured plate" className="preview-img" />
          </div>
        )}

        {/* Scan Button */}
        <div className="scan-action">
          <button
            onClick={scan}
            disabled={!image}
            className={image ? 'scan-btn active' : 'scan-btn disabled'}
          >
            <ScanLine size={32} />
            Scan Number Plate
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;