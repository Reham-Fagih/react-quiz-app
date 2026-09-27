
import React, { useState } from "react";

function Quiz() {
    const questionsBank = [
        {
            question: "What is the capital of France?",
            options: ["Paris", "London", "Berlin", "Madrid"],
            answer: "Paris",
        },
        {
            question: "What is the largest planet in our solar system?",
            options: ["Jupiter", "Saturn", "Earth", "Mars"],
            answer: "Jupiter",
        },
        {
            question: "What is the chemical symbol for gold?",
            options: ["Au", "Ag", "Fe", "Hg"],
            answer: "Au",
        },
    ];

    const initialAnswers = [null, null, null];

    const [userAnswers, setUserAnswers] = useState(initialAnswers);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const selectedAnswer = userAnswers[currentQuestionIndex];

    const currentQuestion = questionsBank[currentQuestionIndex];

    function handleSelectedOption(option) {
        const updatedAnswers = [...userAnswers];
        updatedAnswers[currentQuestionIndex] = option;
        setUserAnswers(updatedAnswers);
    }

    function goToPreviousQuestion() {

        if(currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
    }

    function goToNextQuestion() {
        if(currentQuestionIndex < questionsBank.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    }


    return (
        <div>
            <h2>Q{currentQuestionIndex + 1}</h2>
            <p className="question">{currentQuestion.question}</p>

            {currentQuestion.options.map((option) => (
                <button
                    key={option}
                    className="option"
                    onClick={() => handleSelectedOption(option)}
                    style={{
                        backgroundColor: selectedAnswer === option ? "#d0ebff" : "white",
                    }}
                >
                    {option}
                </button>
            ))}

            <div className="nav-buttons">
                <button onClick={goToPreviousQuestion} disabled={currentQuestionIndex === 0}>
                    Previous
                </button>
                <button onClick={goToNextQuestion} disabled={!selectedAnswer}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default Quiz;