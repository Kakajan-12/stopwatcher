import "./App.css";
import { useEffect, useRef, useState } from "react";

function App() {
  const currentTimer = useRef();
  const [seconds, setSeconds] = useState(0);
  const [minute, setMinute] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    return () => clearInterval(currentTimer.current);
  }, []);

  const start = () => {
    currentTimer.current = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);
    setIsDisabled(true);
  };

  const stop = () => {
    clearInterval(currentTimer.current);
    setIsDisabled(false);
  };

  const restart = () => {
    clearInterval(currentTimer.current);
    setSeconds(0);
    currentTimer.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  };

  const restore = () => {
    clearInterval(currentTimer.current);
    setSeconds(0);
    setIsDisabled(false);
  };

  useEffect(() => {
    if (seconds === 59) {
      setSeconds(0);
      setMinute(minute +1);
    }
  }, [seconds]);

  return (
    <div className="App">
      <div className="stopwatch__body">
        <p className="stopwatch__count">
          00:{minute < 10 ? "0" + minute : minute}:
          {seconds < 10 ? "0" + seconds : seconds}
        </p>
        <div className="stopwatch__controller">
          <button disabled={isDisabled === true} onClick={start}>
            Start
          </button>
          <button onClick={stop} disabled={seconds === 0}>
            Stop
          </button>
          <button onClick={restart} disabled={seconds === 0}>
            Restart
          </button>
          <button onClick={restore} disabled={seconds === 0}>
            Restore
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
