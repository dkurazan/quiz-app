import { useState } from "react";
import QUESTIONS from "../questions.js";

export default function Quiz() {
    const [userAnswers, setuserAnswers] = useState([]);

    const activeQuestionIndex = userAnswers.length;

    const handleSelectAnswer = (answer) => {
        setuserAnswers(prevAnswers => [...prevAnswers, answer]);
    };

    return (
        <main id="quiz">
            <div id="question">
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <ul id="answers">
                    {QUESTIONS[activeQuestionIndex].answers.map(
                        (answer) => (
                            <li key={answer} className="answer">
                                <button onClick={() => handleSelectAnswer(answer)}>
                                    {answer}
                                </button>
                            </li>
                        )
                    )}
                </ul>
            </div>
        </main>
    );
}
