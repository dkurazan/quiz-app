import summaryLogo from "../assets/quiz-complete.png";

export default function Summary() {
    return (
        <div id="summary">
            <img src={summaryLogo} alt="Summary icon" />
            <h2>Quiz completed!</h2>
        </div>
    );
}