import { useState } from "react";
import JokeQuestion from "./JokeQuestion";
import JokePunchline from "./JokePunchline";

function JokeOverlay() {
  const [question, setQuestion] = useState(
    "Why couldn't web developers find their room in a hotel?",
  );
  const [questionDone, setQuestionDone] = useState(false);
  const [punchline, setPunchline] = useState(
    "Because their room number is 404",
  );
  return (
    <div className="fixed flex h-full w-full flex-col items-center justify-center gap-10 bg-orange-100 lg:gap-20">
      <JokeQuestion setDone={setQuestionDone} key={question}>
        {question}
      </JokeQuestion>
      <hr className="w-9/12 border-black" />
      <JokePunchline showCursor={questionDone} key={punchline}>
        {punchline}
      </JokePunchline>

      {/* For testing purposes */}
      <button
        onClick={() => {
          if (
            question ===
            "Why couldn't web developers find their room in a hotel?"
          ) {
            setQuestion("hello world");
            setPunchline("Hello there!!");
          } else {
            setQuestion(
              "Why couldn't web developers find their room in a hotel?",
            );
            setPunchline("Because their room number is 404");
          }
        }}
      >
        Change Joke Question
      </button>
    </div>
  );
}

export default JokeOverlay;
