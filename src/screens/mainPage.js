import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const cards = [
  {
    id: 1,
    image: '/images/learn.png',
    route: '/page1',
  },
  {
    id: 2,
    image: '/images/think.png',
    route: '/page2',
  },
  {
    id: 3,
    image: '/images/game.png',
    route: '/page3',
  },
];

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <div className="main-container"
    style={{
      backgroundImage: "url('/images/start.png')",
      backgroundSize: "cover",         
      backgroundPosition: "center",     
      width: "100vw",                  
      height: "100vh",                
  }}>
      {cards.map((card) => (
        <div key={card.id} className="card">
          <div className="badge">
            {card.id.toString().padStart(2, '0')}
          </div>
          <div className="image-container">
            <img src={card.image} alt={`Card ${card.id}`} />
          </div>
          <button className="play-button" onClick={() => navigate(card.route)}>
            Тоглох
          </button>
        </div>
      ))}
    </div>
  );
};

export default MainPage;
