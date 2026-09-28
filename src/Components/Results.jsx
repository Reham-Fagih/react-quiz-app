
function Results ({ userAnswers, questionsBank }) {

    console.log(userAnswers, questionsBank);

    const calculateScore = () => {
        let score = 0;
        questionsBank.forEach((question, index) => {
            if (userAnswers[index] === question.answer) {
                score++;
            }
        });
        return score;
    };

    const score = calculateScore();

    return (
        <div>
            <h2>Quiz completed!</h2>
            <p> Score {score}/{questionsBank.length} </p>
            <button className="restart-button" onClick={() => window.location.reload()}>
                Restart Quiz
            </button>
        </div>
    )

}

export default Results;