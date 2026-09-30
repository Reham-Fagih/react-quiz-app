import { useState } from 'react';
import Quiz from './quiz.jsx';

function UserInfo() {
    const [name, setName] = useState('');
    const [quizStarted, setQuizStarted] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();
        const trimmedName = name.trim();
        if (!trimmedName) return;

        setName(trimmedName);
        setQuizStarted(true);
    }

    if (quizStarted) return <Quiz name={name} />;

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="user-name" className="label">
                Enter your name: 
            </label>
            <input
                id="user-name"
                name="name"
                className="input-field"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
            />
            <div className="nav-buttons"> 
                <button  className="nav-buttons " type="submit" disabled={!name.trim()}>
                Start Quiz
            </button>

            </div>
           
        </form>
    );
}

export default UserInfo;