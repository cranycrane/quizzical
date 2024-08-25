import React from "react"
import Question from "./Question"


export default function Quiz(props) {
    const [questions, setQuestions] = React.useState([])
    const [userAnswers, setUserAnswers] = React.useState({})
    const [score, setScore] = React.useState(0);
    const [showResults, setShowResults] = React.useState(false);
    
    React.useEffect(() => {
        loadQuestions();
    }, []);
    

    function playAgain() {
        setUserAnswers({});
        setScore(0);
        setShowResults(false);
        loadQuestions();
    }
    
    const he = require('he');
    async function loadQuestions() {
        try {
            const res = await fetch("https://opentdb.com/api.php?amount=5&type=multiple");
            const data = await res.json();
            if (data.results) {
                const shuffledQuestions = data.results.map((question, index) => ({
                    id: index + 1,
                    question: he.decode(question.question),  // Dekódování HTML entit v otázce
                    correctAnswer: he.decode(question.correct_answer),  // Dekódování HTML entit ve správné odpovědi
                    answers: shuffleArray([
                        he.decode(question.correct_answer),  // Dekódování správné odpovědi
                        ...question.incorrect_answers.map(answer => he.decode(answer))  // Dekódování špatných odpovědí
                    ])
                }));
                setQuestions(shuffledQuestions);
            } else {
                console.error('No results returned from API');
            }
        } catch (error) {
            console.error('Failed to fetch questions', error);
        }
    }
    

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
    
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function handleAnswerChange(event, questionId) {
        const { value } = event.target
        setUserAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionId]: value
        }))
    }

    function checkAnswers(event) {
        event.preventDefault();
        let newScore = 0;
        questions.forEach(question => {
            if (userAnswers[question.id] === question.correctAnswer) {
                newScore += 1;  // Přičtení bodu za správnou odpověď
            }
        });
        setScore(newScore);
        setShowResults(true);
    }



    const questionElements = questions && questions.map(question => {
        const isAnswered = showResults
        const userAnswer = userAnswers[question.id];
        const isCorrect = userAnswers[question.id] == question.correctAnswer

        return <Question 
            question={question.question} 
            key={question.id} 
            id={question.id} 
            answers={question.answers} 
            onAnswerChange={handleAnswerChange}
            correctAnswer={question.correctAnswer}
            userAnswer={userAnswer}
            isAnswered={isAnswered}
            isCorrect={isCorrect}
        />;
    })
    
    return (
        <div className="container">
            <form onSubmit={checkAnswers}>
                {questionElements}
            {showResults ?
             <div className="results">
                <p className="score">You scored {score}/5 correct answers</p>
                <button className="submit-button" onClick={playAgain}>Play again</button>
            </div> : 
             <button className="submit-button">Check answers</button>}
            </form>
        </div>
    )
}