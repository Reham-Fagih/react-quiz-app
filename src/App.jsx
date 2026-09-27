import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './index.css'
import Quiz from './Components/quiz.jsx'

function App() {

  return (
    <div className="app-container"> 
     <h1>Quiz App </h1>
     <Quiz />
    </div>
   
  );
}

export default App
