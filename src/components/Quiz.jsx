import { useCallback, useEffect, useState } from "react";
import QUESTIONS from "../questions.js";
import Summary from "./Summary.jsx";
import QuestionTimer from "./QuestionTimer.jsx";

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]);
    const [answerState, setAnswerState] = useState("");

    const activeQuestionIndex =
        answerState === "" ? userAnswers.length : userAnswers.length - 1;
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    const handleSelectAnswer = (answer) => {
        setAnswerState("answered");

        setUserAnswers((prevAnswers) => [...prevAnswers, answer]);

        setTimeout(() => {
            if (answer === QUESTIONS[activeQuestionIndex].answers[0]) {
                setAnswerState("correct");
            } else {
                setAnswerState("wrong");
            }

            setTimeout(() => {
                setAnswerState("");
            }, 2000);
        }, 1000);
    };

    const handleTimeout = useCallback(() => {
        setUserAnswers((prevAnswers) => [...prevAnswers, null]);
    }, []);

    if (quizIsComplete) {
        return <Summary />;
    }

    const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
    shuffledAnswers.sort(() => Math.random() - 0.5);

    return (
        <div id="quiz">
            <div id="question">
                <QuestionTimer
                    key={activeQuestionIndex}
                    timeout={10000}
                    onTimeout={handleTimeout}
                />
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <ul id="answers">
                    {shuffledAnswers.map((answer) => {
                        const isSellected = answer === userAnswers[userAnswers.length - 1]
                        let cssClasses = '';

                        if(answerState === 'answered') {
                            cssClasses = 'selected';
                        } else if (answerState === 'wrong') {
                            cssClasses = 'wrong';
                        } else if (answerState === 'correct') {
                            cssClasses = 'correct';
                        }

                        return (
                            <li key={answer} className="answer">
                                <button
                                    className={isSellected && cssClasses}
                                    onClick={() => handleSelectAnswer(answer)}
                                >
                                    {answer}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
