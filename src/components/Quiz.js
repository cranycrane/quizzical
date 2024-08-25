import React from "react"
import Question from "./Question"
import data from './data.json';



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
    
    function loadQuestions() {
        try {
            //const res = await fetch("https://opentdb.com/api.php?amount=5&type=multiple")
            //const data = await res.json()
            // Toto je místo, kde byste načítali data z API nebo jiného zdroje
            if (data.results) {
                const shuffledQuestions = data.results.map((question, index) => ({
                    id: index + 1,
                    question: question.question,
                    correctAnswer: question.correct_answer,
                    answers: shuffleArray([question.correct_answer, ...question.incorrect_answers])
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
        return <Question 
                    question={question.question} 
                    key={question.id} 
                    id={question.id} 
                    answers={question.answers} 
                    onAnswerChange={handleAnswerChange}/>
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