import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const animals = ["🦁", "🐰", "🐶", "🐱", "🐸", "🐵", "🐼"];

function App() {
    const navigate = useNavigate();
    const totalLevels = 5;
    const [randomAnimal, setRandomAnimal] = useState("🦁");
    const [randomCount, setRandomCount] = useState(0);
    const [userAnswer, setUserAnswer] = useState("");
    const [result, setResult] = useState("");
    const [level, setLevel] = useState(0);
    const [canRetry, setCanRetry] = useState(false);
    const [gameWon, setGameWon] = useState(false);

    // Random сорил үүсгэх
    const generateChallenge = () => {
        const animal = animals[Math.floor(Math.random() * animals.length)];
        const count = Math.floor(Math.random() * 5) + 1; // 1-5
        setRandomAnimal(animal);
        setRandomCount(count);
        setUserAnswer("");
        setResult("");
        setCanRetry(false);
    };

    // Эхэлж нэг сорил үүсгэнэ
    useEffect(() => {
        generateChallenge();
    }, []);

    // Шалгах товч дарах
    const handleCheck = () => {
        if (parseInt(userAnswer) === randomCount) {
            const nextLevel = level + 1;
            setLevel(nextLevel);
            setResult("🎉 Зөв байна!");
            if (nextLevel === totalLevels) {
                setGameWon(true);
            } else {
                setTimeout(() => {
                    generateChallenge();
                }, 1000);
            }
        } else {
            setResult("😅 Буруу байна. Дахин оролдоорой!");
            setCanRetry(true);
        }
    };

    // Прогресс барын style
    const progressWidth = `${(level / totalLevels) * 100}%`;
    return (
        <>
            <div style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                width: "80%",
                margin: "0 auto",
                gap: "20px",
                padding: "20px",
                borderRadius: "15px",
            }}>
                {/* Дээрх progress bar */}
                <div
                    style={{
                        background: "#f3d4f8",
                        height: "50px",
                        width: "80%",
                        margin: "20px auto",
                        borderRadius: "20px",
                        overflow: "hidden",
                        flex: 9,
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "10px",
                    }}
                >
                    <div
                        style={{
                            background: "#d48df8",
                            height: "100%",
                            width: progressWidth,
                            transition: "width 0.3s",
                        }}
                    />
                </div>
                <div style={{
                    flex: 1,
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: "10px",
                }} >
                    <button
                        onClick={() => navigate('/page1/pause')}
                        style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            backgroundColor: '#eee',
                            border: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                            cursor: 'pointer'
                        }}
                    >
                        <span style={{ display: 'flex', gap: '3px' }}>
                            <div style={{ width: '4px', height: '16px', backgroundColor: '#333' }} />
                            <div style={{ width: '4px', height: '16px', backgroundColor: '#333' }} />
                        </span>
                    </button>
                </div>
            </div>


            {/* Хоёр хэсэгт хуваасан хүрээ */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "80%",
                    margin: "0 auto",
                    gap: "20px",
                    backgroundColor: "#f9f1ff",
                    padding: "20px",
                    borderRadius: "15px",
                }}
            >
                {/* Emoji хэсэг (70%) */}
                <div
                    style={{
                        flex: 7,
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        gap: "10px",
                    }}
                >
                    {[...Array(randomCount)].map((_, index) => (
                        <span key={index} style={{ fontSize: "60px" }}>
                            {randomAnimal}
                        </span>
                    ))}
                </div>

                {/* Input + Button хэсэг (30%) */}
                <div style={{ flex: 3, textAlign: "center" }}>
                    <input
                        type="number"
                        placeholder="Хэдэн амьтан байна?"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        style={{
                            padding: "10px",
                            fontSize: "18px",
                            borderRadius: "10px",
                            border: "1px solid #ccc",
                            width: "100%",
                            boxSizing: "border-box",
                        }}
                    />

                    <button
                        onClick={handleCheck}
                        style={{
                            marginTop: "10px",
                            padding: "10px 20px",
                            fontSize: "18px",
                            borderRadius: "10px",
                            border: "none",
                            backgroundColor: "#eecbff",
                            cursor: "pointer",
                            width: "100%",
                        }}
                        disabled={gameWon}
                    >
                        Шалгах
                    </button>
                </div>
            </div>
        </>
    );

}

export default App;
