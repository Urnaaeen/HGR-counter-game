import { useState, useEffect } from 'react';

const FROG_EMOJI = '🐸';
const LILY_PAD = '/images/navch.png';
const CAMERA_ICON = '/images/camera-icon.png';

const directions = [
  [0, 1],   // Баруун
  [1, 0],   // Доош
  [0, -1],  // Зүүн
  [-1, 0],  // Дээш
];

function FrogGame() {
  const [grid, setGrid] = useState([]);
  const [frogPosition, setFrogPosition] = useState([0, 0]);
  const [pathCoords, setPathCoords] = useState([]);
  const [steps, setSteps] = useState([]); // random 4 тоо
  const [userInput, setUserInput] = useState('');
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const generatePathWithSteps = () => {
      const rows = 6;
      const cols = 6;
      const tempGrid = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => '')
      );

      let x = 0, y = 0;
      const path = [[x, y]];
      const randomSteps = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3) + 1);

      for (let i = 0; i < 4; i++) {
        const [dx, dy] = directions[i % directions.length];
        for (let j = 0; j < randomSteps[i]; j++) {
          const newX = x + dx;
          const newY = y + dy;

          if (newX >= 0 && newY >= 0 && newX < rows && newY < cols) {
            x = newX;
            y = newY;
            path.push([x, y]);
          } else {
            break;
          }
        }
      }

      setSteps(randomSteps);
      setPathCoords(path);
      setFrogPosition(path[0]);
      setGrid(tempGrid);
    };

    generatePathWithSteps();
  }, []);

  const handleInputSubmit = (e) => {
    e.preventDefault();
    const input = parseInt(userInput, 10);

    if (input === steps[currentStep]) {
      const nextStep = currentStep + 1;
      if (nextStep < pathCoords.length) {
        setCurrentStep(nextStep);
        setFrogPosition(pathCoords[nextStep]);
        setUserInput('');
      } else {
        alert('🎉 Бүх замыг зөв тууллаа!');
      }
    } else {
      alert('❌ Буруу тоо! Дахин оролдоно уу.');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100vh',
        padding: '20px',
        backgroundColor: '#f0f8ff',
      }}
    >
      {/* Зүүн тал: Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(6, 100px)`,
          gridGap: '10px',
          backgroundColor: '#cce7ff',
          padding: '20px',
          borderRadius: '10px',
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((_, colIndex) => {
            const isFrog = rowIndex === frogPosition[0] && colIndex === frogPosition[1];
            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                style={{
                  width: '100px',
                  height: '100px',
                  backgroundImage: `url(${LILY_PAD})`,
                  backgroundSize: 'cover',
                  position: 'relative',
                }}
              >
                {isFrog && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      fontSize: '32px',
                    }}
                  >
                    {FROG_EMOJI}
                  </span>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Баруун тал: Input ба icon */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#eaffea',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <img
          src={CAMERA_ICON}
          alt="Camera Icon"
          style={{ width: '60px', height: '60px', marginBottom: '20px' }}
        />
        <form onSubmit={handleInputSubmit}>
          <input
            type="number"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Тоо оруулна уу"
            style={{
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              marginBottom: '10px',
            }}
          />
          <button
            type="submit"
            style={{
              padding: '10px 20px',
              backgroundColor: '#4caf50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Шалгах
          </button>
        </form>
      </div>
    </div>
  );
}

export default FrogGame;
