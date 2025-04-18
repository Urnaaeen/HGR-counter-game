import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';


const MainPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <button className="circle-button" onClick={() => navigate('/page1')}>
        <img src="/images/learn.png" alt="Page 1" />
      </button>
      <button className="circle-button" onClick={() => navigate('/page2')}>
        <img src="/images/think.png" alt="Page 2" />
      </button>
      <button className="circle-button" onClick={() => navigate('/page3')}>
        <img src="/images/game.png" alt="Page 3" />
      </button>
    </div>
  );
};

export default MainPage;
