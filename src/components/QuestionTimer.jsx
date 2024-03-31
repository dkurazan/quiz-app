import { useState, useEffect } from "react";

export default function QuestionTimer({ timeout, onTimeout, mode }) {
    const [timeWasted, setTimeWasted] = useState(timeout);

    useEffect(() => {
        const timer = setTimeout(onTimeout, timeout);

        return () => clearTimeout(timer);
    }, [timeout, onTimeout]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeWasted((prevTime) => prevTime - 50);
        }, 50);

        return () => clearInterval(interval);
    }, []);

    return <progress max={timeout} value={timeWasted} className={mode} />;
}
