import { useEffect, useRef, useState } from "react";
import JokeQuestion from "./JokeQuestion";
import JokePunchline from "./JokePunchline";

function JokeOverlay() {
  const [question, setQuestion] = useState(
    "Why couldn't web developers find their room in a hotel?",
  );
  const [punchline, setPunchline] = useState(
    "Because their room number is 404",
  );
  const [questionDone, setQuestionDone] = useState(false);
  const [jokeDone, setJokeDone] = useState(false);
  const overlay = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (jokeDone) {
      const fadeoutTimer = setTimeout(() => {
        overlay.current?.classList.add("animate-slide-out");
        const body = document.querySelector("body")!;
        body.style.overflowY = "auto";
      }, 3000);
    }
  });

  return (
    <div
      ref={overlay}
      className="fixed z-10 flex h-full w-full flex-col items-center justify-center gap-10 bg-orange-100 lg:gap-20"
    >
      <JokeQuestion setDone={() => setQuestionDone(true)} key={question}>
        {question}
      </JokeQuestion>
      <hr className="w-9/12 border-black" />
      <JokePunchline
        showCursor={questionDone}
        setDone={() => setJokeDone(true)}
        key={punchline}
      >
        {punchline}
      </JokePunchline>
    </div>
  );
}

export default JokeOverlay;
