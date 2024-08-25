import React from "react"
import Answer from "./Answer"


export default function Question(props){

    const answerElements = props.answers.map((answer, index) => {
        const uniqueId = `${props.id}-${index}`; 
        return (
            <div className="answer">
                <label htmlFor={uniqueId}>
                    {answer}
                    <input type="radio" id={uniqueId} name={props.id} value={answer} onChange={(event) => props.onAnswerChange(event, props.id)} />
                </label>
            </div>
        );
    });
    
    

    return (
        <div className="question-container">
            <p className="question">{props.question}</p>
            <div className="answers">
                {answerElements}
            </div>
        </div>
    )
}