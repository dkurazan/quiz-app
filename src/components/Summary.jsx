import summaryLogo from "../assets/quiz-complete.png";
import QUESTIONS from "../questions";

export default function Summary({ userAnswers }) {
    const skippedAnswers = userAnswers.filter((answer) => answer === null);
    const correctAnswers = userAnswers.filter(
        (answer, index) => answer === QUESTIONS[index].answers[0]
    );

    const skippedAnswersStat = Math.round(
        (skippedAnswers.length / userAnswers.length) * 100
    );
    const correctAnswersStat = Math.round(
        (correctAnswers.length / userAnswers.length) * 100
    );

    const wrongAnswersStat = 100 - skippedAnswersStat - correctAnswersStat;

    return (
        <div id="summary">
            <img src={summaryLogo} alt="Summary icon" />
            <h2>Quiz completed!</h2>
            <div id="summary-stats">
                <p>
                    <span className="number">{skippedAnswersStat}%</span>
                    <span className="text">skipped</span>
                </p>
                <p>
                    <span className="number">{correctAnswersStat}%</span>
                    <span className="text">answered correctly</span>
                </p>
                <p>
                    <span className="number">{wrongAnswersStat}%</span>
                    <span className="text">answered incorrectly</span>
                </p>
            </div>
            <ol>
                {userAnswers.map((answer, index) => {
                    let cssClass = "user-answer";

                    if (answer === null) {
                        cssClass += " skipped";
                    } else if (answer === QUESTIONS[index].answers[0]) {
                        cssClass += " correct";
                    } else {
                        cssClass += " wrong";
                    }

                    return (
                        <li key={index}>
                            <h3>{index + 1}</h3>
                            <p className="question">
                                {QUESTIONS[index].answers[0]}
                            </p>
                            <p className={cssClass}>{answer ?? "Skipped"}</p>
                        </li>
                    );
                })}
            </ol>
        </div>
    );
}
