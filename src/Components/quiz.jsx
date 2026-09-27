
function Quiz() { 

    const qustionsBank = [

        {
            qustion: "What is the capital of France?",
            options: ["Paris", "London", "Berlin", "Madrid"],
            answer: "Paris"
        },
        {
            qustion: "What is the largest planet in our solar system?",
            options: ["Jupiter", "Saturn", "Earth", "Mars"],
            answer: "Jupiter"
        },
        {
            qustion: "What is the chemical symbol for gold?",
            options: ["Au", "Ag", "Fe", "Hg"],
            answer: "Au"
        } 

    ]

    function handelSelectedOption(options) {

    }
    return <div> 
        <h2> Q1 </h2>
        <p className="question">{qustionsBank[0].qustion}</p>

{qustionsBank[0].options.map((options) => (
    <button className="option" onClick={()=> handelSelectedOption(options)}> {options}</button>

))}
    <div className="nav-buttons">
        <button>Previous</button>
        <button>Next</button>
    </div>

    </div>

}

export default Quiz;