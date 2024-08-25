import logo from './logo.svg';
import './App.css';
import React from 'react';
import Start from "./components/Start"
import Quiz from './components/Quiz';

function App() {
  const [start, setStart] = React.useState(false)


  function startQuiz() {
    console.log("LETS GO")
    setStart(true)
  }


  return (
      <main>
        {!start && <Start startQuiz={startQuiz} />}
        {start && <Quiz />}
      </main>
  );
}

export default App;
