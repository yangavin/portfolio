import { useState } from "react";
import JokeQuestion from "./JokeQuestion";

function JokeOverlay() {
  const [question, setQuestion] = useState(
    "Why couldn't web developers find their room in a hotel?",
  );
  const punchline = "Because their room number is 404";
  return (
    <div className="fixed flex h-full w-full flex-col items-center justify-center gap-10 bg-orange-100 font-anonymous-pro lg:gap-20">
      <JokeQuestion question={question} key={question} />
      <hr className="w-9/12 border-black" />
      <h2 className="text-center md:text-2xl lg:text-3xl"></h2>

      {/* For testing purposes */}
      <button
        onClick={() => {
          if (
            question ===
            "Why couldn't web developers find their room in a hotel?"
          )
            setQuestion("hello world");
          else
            setQuestion(
              "Why couldn't web developers find their room in a hotel?",
            );
        }}
      >
        Change Joke Question
      </button>
    </div>
  );
}

export default JokeOverlay;
