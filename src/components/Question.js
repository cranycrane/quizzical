import React from "react"

export default function Question(props){
    const { question, answers, id, onAnswerChange, correctAnswer, userAnswer, isAnswered } = props;


    const answerElements = answers.map((answer, index) => {
        const uniqueId = `${id}-${index}`; 
        let className = "answer";
        
        if (isAnswered) {
            if (answer === correctAnswer) {
                className += " correct"; // Správná odpověď vždy zelená
            } else if (answer === userAnswer) {
                console.log("incorrect")
                className += " incorrect"; // Zvolená špatná odpověď červená
            }
        }

        return (
            <div className={className}>
                <label htmlFor={uniqueId}>
                    {answer}
                    <input type="radio" 
                    id={uniqueId} 
                    name={id} 
                    value={answer} 
                    disabled={isAnswered} 
                    checked={userAnswer === answer}
                    onChange={(event) => onAnswerChange(event, id)} 
                />
                </label>
            </div>
        );
    });
    
    

    return (
        <div className="question-container">
            <p className="question">{question}</p>
            <div className="answers">
                {answerElements}
            </div>
        </div>
    )
}