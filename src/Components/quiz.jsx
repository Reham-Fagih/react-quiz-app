
import { useEffect, useState } from 'react';
import Results from './Results';


function decodeHtml(value) {
    const document = new DOMParser().parseFromString(value, 'text/html');
    return document.documentElement.textContent;
}

function Quiz({ name }) {
    const [questions, setQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isQuizCompleted, setIsQuizCompleted] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
    const controller = new AbortController();

    async function fetchQuestions() {
        try {
            setLoading(true);
            setError('');

            const response = await fetch(
                'https://opentdb.com/api.php?amount=10&category=18&type=multiple',
                { signal: controller.signal }
            );

            if (response.status === 429) {
                throw new Error('Too many requests. Please try again later.');
            }

            if (!response.ok) {
                throw new Error('Could not load quiz questions.');
            }

            const json = await response.json();

            if (json.response_code !== 0 || !json.results?.length) {
                throw new Error('No quiz questions were returned.');
            }

            const questionBank = json.results.map((item) => ({
                question: decodeHtml(item.question),
                answer: decodeHtml(item.correct_answer),
                options: [...item.incorrect_answers, item.correct_answer]
                    .map(decodeHtml)
                    .sort(() => Math.random() - 0.5),
            }));

            setQuestions(questionBank);
            setUserAnswers(Array(questionBank.length).fill(null));

        } catch (error) {
            if (error.name !== 'AbortError') {
                setError(error.message);
            }
        } finally {
            if (!controller.signal.aborted) {
                setLoading(false);
            }
        }
    }

    fetchQuestions();

    return () => {
        controller.abort();
    };
}, []);

    if (loading) return <p>Loading questions...</p>;
    if (error) return <p role="alert">{error}</p>;
    if (isQuizCompleted) {
        return <Results name={name} userAnswers={userAnswers} questionsBank={questions} />;
    }

    const currentQuestion = questions[currentQuestionIndex];
    const selectedAnswer = userAnswers[currentQuestionIndex];

    function handleSelectedOption(option) {
        const updatedAnswers = [...userAnswers];
        updatedAnswers[currentQuestionIndex] = option;
        setUserAnswers(updatedAnswers);
    }

    function goToNextQuestion() {
        if (currentQuestionIndex === questions.length - 1) {
            setIsQuizCompleted(true);
        } else {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    }

    return (
        <div>
            <p>Question {currentQuestionIndex + 1} of {questions.length}</p>
            <p className="question">{currentQuestion.question}</p>

            <div role="group" aria-label="Answer options">
                {currentQuestion.options.map((option) => (
                    <button
                        className={`option${selectedAnswer === option ? ' selected' : ''}`}
                        key={option}
                        onClick={() => handleSelectedOption(option)}
                        aria-pressed={selectedAnswer === option}
                    >
                        {option}
                    </button>
                ))}
            </div>

            <div className="nav-buttons">
                <button
                    onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
                    disabled={currentQuestionIndex === 0}
                >
                    Previous
                </button>
                <button onClick={goToNextQuestion} disabled={!selectedAnswer}>
                    {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
                </button>
            </div>
        </div>
    );
}

export default Quiz;