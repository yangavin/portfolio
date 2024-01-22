import { useEffect, useRef, useState } from "react";
import JokeQuestion from "./JokeQuestion";
import JokePunchline from "./JokePunchline";

type Joke = [{ question: string; punchline: string }];

function JokeOverlay() {
  const [question, setQuestion] = useState("");
  const [punchline, setPunchline] = useState("");
  const [questionDone, setQuestionDone] = useState(false);
  const [jokeDone, setJokeDone] = useState(false);

  const overlay = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("https://backend-omega-seven.vercel.app/api/getjoke")
      .then((res) => res.json())
      .then((jokeData: Joke) => {
        console.log(`Joke fetched: ${JSON.stringify(jokeData)}`);
        setQuestion(jokeData[0].question);
        setPunchline(jokeData[0].punchline);
      })
      .catch((err) => {
        // Remove overlay if unable to fetch
        setJokeDone(true);
        console.error(err);
      });
  }, []);

  useEffect(() => {
    if (jokeDone) {
      const fadeoutTimer = setTimeout(() => {
        overlay.current?.classList.add("animate-slide-out");
        const body = document.querySelector("body")!;
        body.style.overflowY = "auto";
      }, 3000);
      return () => clearTimeout(fadeoutTimer);
    }
  }, [jokeDone]);
  if (question && punchline) {
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
  return (
    <div
      ref={overlay}
      className="fixed z-10 flex h-full w-full flex-col items-center justify-center gap-10 bg-orange-100 lg:gap-20"
    >
      <hr className="w-9/12 border-black" />
    </div>
  );
}

export default JokeOverlay;
