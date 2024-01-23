import { useEffect, useRef, useState } from "react";
import JokeQuestion from "./JokeQuestion";
import JokePunchline from "./JokePunchline";

type Joke = {
  error: boolean;
  category: "Programming" | "Misc" | "Dark" | "Pun" | "Spooky" | "Christmas";
  type: string;
  setup: string;
  delivery: string;
  flags: {
    nsfw: boolean;
    religious: boolean;
    political: boolean;
    racist: boolean;
    sexist: boolean;
    explicit: boolean;
  };
  id: number;
  safe: boolean;
  lang: string;
};

function JokeOverlay() {
  const [question, setQuestion] = useState("");
  const [punchline, setPunchline] = useState("");
  const [questionDone, setQuestionDone] = useState(false);
  const [jokeDone, setJokeDone] = useState(false);

  const overlay = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchTimeout = setTimeout(() => controller.abort(), 3000);

    fetch(
      "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,racist,sexist,explicit&type=twopart",
      {
        signal: controller.signal,
      },
    )
      .then((res) => res.json())
      .then((jokeData: Joke) => {
        setQuestion(jokeData.setup);
        setPunchline(jokeData.delivery);
      })
      .catch((err) => {
        // Default to this joke if the fetching is too slow
        setQuestion("Why couldn't web developers find their room in a hotel?");
        setPunchline("Because their room number is 404");
        console.error(err);
      });

    return () => clearTimeout(fetchTimeout);
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
      <h1 className="w-3/4 text-center text-2xl md:text-3xl lg:text-7xl lg:leading-snug">
        <span className="animate-pulse">|</span>
      </h1>
      <hr className="w-9/12 border-black" />
    </div>
  );
}

export default JokeOverlay;
