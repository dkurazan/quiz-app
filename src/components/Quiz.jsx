import { useCallback, useState } from "react";
import QUESTIONS from "../questions.js";
import Summary from "./Summary.jsx";
import QuestionTimer from "./QuestionTimer.jsx";
import Answers from "./Answers.jsx";

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]);
    const [answerState, setAnswerState] = useState("");

    let timer = 10000;

    if (answerState === "answered") {
        timer = 1000;
    } else if (answerState === "correct" || answerState === "wrong") {
        timer = 2000;
    }

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
        return <Summary userAnswers={userAnswers} />;
    }

    return (
        <div id="quiz">
            <div id="question" key={activeQuestionIndex}>
                <QuestionTimer
                    key={timer}
                    timeout={timer}
                    onTimeout={answerState === '' ? handleTimeout : null}
                    mode={answerState}
                />
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <Answers
                    answers={QUESTIONS[activeQuestionIndex].answers}
                    selectedAnswer={userAnswers[userAnswers.length - 1]}
                    answerState={answerState}
                    onGetAnswer={handleSelectAnswer}
                />
            </div>
        </div>
    );
}
