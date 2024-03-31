import { useState, useEffect } from "react";


export default function QuestionTimer({timeout, onTimeout}) {
    const [timeWasted, setTimeWasted] = useState(timeout);

    useEffect(() => {
        console.log('set timeout');
        const timer = setTimeout(onTimeout, timeout);

        return () => clearTimeout(timer)
    }, [timeout, onTimeout])

    useEffect(() => {

      
        console.log('set interval');

        const interval = setInterval(() => {
            setTimeWasted(prevTime => prevTime - 50);
        }, 50);

        return () => clearInterval(interval)
    }, [])

    return (
        <progress max={timeout} value={timeWasted} />
    )
}