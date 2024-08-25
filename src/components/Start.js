import React from "react"


export default function Start(props) {


    return (
        <div className="container">
            <h1 className="title">Quizzical</h1>
            <p className="description">Some description if needed</p>
            <button className="button" onClick={props.startQuiz}>Start quiz</button>
        </div>
    )
}