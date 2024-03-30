import logo from '../assets/quiz-logo.png';

export default function Header() {
    return (
        <header>
            <img src={logo} alt="logo" />
            <h1>Quiz app</h1>
        </header>
    );
}
