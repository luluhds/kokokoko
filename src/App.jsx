import { useState, useRef } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setCameraActive(true);
    } catch (error) {
      console.error('Erro ao acessar a câmera:', error);
    }
  };

  const takePhoto = () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext('2d');
      context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
      setCount((prevCount) => prevCount + 1);
      alert('Foto tirada! Você ganhou 1 ponto.');
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
      setCameraActive(false);
    }
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <p>Pontos acumulados: {count}</p>
        {!cameraActive ? (
          <button onClick={startCamera}>Ativar Câmera</button>
        ) : (
          <>
            <video ref={videoRef} autoPlay playsInline width="300" height="200"></video>
            <canvas ref={canvasRef} width="300" height="200" style={{ display: 'none' }}></canvas>
            <button onClick={takePhoto}>Tirar Foto</button>
            <button onClick={stopCamera}>Desativar Câmera</button>
          </>
        )}
      </div>
      <p className="read-the-docs">
        Clique nos logos do Vite e React para aprender mais.
      </p>
    </>
  );
}

export default App;