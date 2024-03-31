import { useRef } from "react";

export default function Answers({answers, selectedAnswer, answerState, onGetAnswer}) {
    const shuffledAnswers = useRef();

    if (!shuffledAnswers.current) {
        shuffledAnswers.current = [...answers];
        shuffledAnswers.current.sort(() => Math.random() - 0.5);
    }

    return (
        <ul id="answers">
            {shuffledAnswers.current.map((answer) => {
                const isSellected =
                    answer === selectedAnswer;
                let cssClasses = "";

                if (answerState === "answered") {
                    cssClasses = "selected";
                } else if (answerState === "wrong") {
                    cssClasses = "wrong";
                } else if (answerState === "correct") {
                    cssClasses = "correct";
                }

                return (
                    <li key={answer} className="answer">
                        <button
                            className={isSellected ? cssClasses : undefined}
                            onClick={() => onGetAnswer(answer)}
                        >
                            {answer}
                        </button>
                    </li>
                );
            })}
        </ul>
    );
}
