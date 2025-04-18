import { useState, useEffect } from 'react';
import '../App.css';

const EMOJI_START = '😄';
const EMOJI_PATH = '🍀';
const EMOJI_END = '🚩';
const EMOJI_CORRECT = '😊';

const directions = [
    [0, 1],   // баруун
    [1, 0],   // доош
    [0, 1],   // баруун
    [-1, 0],  // дээш
];

function RandomNumbers() {
    const [numbers, setNumbers] = useState([]);
    const [grid, setGrid] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [currentStep, setCurrentStep] = useState(0); // аль random тоог тааж байгааг хянах
    const [correctPaths, setCorrectPaths] = useState([]); // хэдэн замыг зөв таасан бэ
    const [pathCoordsList, setPathCoordsList] = useState([]); // зам тус бүрийн координатууд

    useEffect(() => {
        const generate = () => {
            const randomNums = Array.from({ length: 4 }, () => Math.floor(Math.random() * 10) + 1);
            setNumbers(randomNums);

            const rows = 10;
            const cols = 20;
            const tempGrid = Array.from({ length: rows }, () =>
                Array.from({ length: cols }, () => '')
            );

            let x = 0, y = 0;
            tempGrid[x][y] = EMOJI_START;

            const paths = [];

            randomNums.forEach((step, i) => {
                const [dx, dy] = directions[i];
                const path = [];
                for (let s = 0; s < step; s++) {
                    x += dx;
                    y += dy;
                    if (x >= 0 && y >= 0 && x < rows && y < cols) {
                        tempGrid[x][y] = EMOJI_PATH;
                        path.push([x, y]);
                    }
                }
                paths.push(path);
            });

            tempGrid[x][y] = EMOJI_END;

            setGrid(tempGrid);
            setPathCoordsList(paths);
            setCorrectPaths([]);
            setUserInput('');
            setCurrentStep(0);
        };

        generate();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const input = parseInt(userInput);
        if (input === numbers[currentStep]) {
            setCorrectPaths([...correctPaths, ...pathCoordsList[currentStep]]);
            setCurrentStep(currentStep + 1);
            setUserInput('');
        } else {
            alert("Буруу байна! Дахин оролдоорой.");
        }
    };

    return (
        <div
            className="path-game"
            style={{
                backgroundImage: "url('/images/background-game.png')",
                backgroundSize: "cover",         
                backgroundPosition: "center",     
                width: "100vw",                  
                height: "100vh",  
                display: "flex",
                justifyContent: "center", // төвлөрүүлэх
                alignItems: "center",
                flexDirection: "column" // багцлах                
            }}
        >
          {/* Grid буюу эможинуудын хэсэг */}
          <div style={{ marginTop: '20px' }}>
            {grid.map((row, rowIndex) => (
              <div key={rowIndex} style={{ lineHeight: '50px', height: '50px' }}>
                {row.map((cell, colIndex) => {
                  const onCorrectPath =
                    correctPaths.some(([x, y]) => x === rowIndex && y === colIndex);
      
                  return (
                    <span
                      key={colIndex}
                      style={{
                        display: 'inline-block',
                        width: '50px',
                        height: '50px',
                        fontSize: '32px', // эможиг томруулах
                        textAlign: 'center',
                        position: 'relative',
                      }}
                    >
                      {cell}
                      {onCorrectPath && (
                        <span
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '50px',
                            height: '50px',
                          }}
                        >
                          {EMOJI_CORRECT}
                        </span>
                      )}
                    </span>
                  );
                })}
              </div>
            ))}
          </div>
      
          {/* Input хэсэг — дэлгэцийн баруун доод буланд */}
          {currentStep < 4 ? (
            <form
              onSubmit={handleSubmit}
              style={{
                position: 'absolute',
                bottom: '20px',
                right: '20px',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                padding: '10px 15px',
                borderRadius: '8px'
              }}
            >
              <label>
                Тоо {currentStep + 1}-г оруулна уу:
                <input
                  type="number"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  style={{ margin: '0 10px' }}
                />
              </label>
              <button type="submit">Шалгах</button>
            </form>
          ) : (
            <h4 style={{ position: 'absolute', bottom: '20px', right: '20px' }}>
              🎉 Бүх таамаг зөв байна!
            </h4>
          )}
        </div>
      );      
}

export default RandomNumbers;
