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
  const [questionIndex, setQuestionIndex] = useState(0);
  const [punchlineIndex, setPunchlineIndex] = useState(0);
  const [punchlineStart, setPunchlineStart] = useState(false);

  const questionDone = question !== "" && questionIndex === question.length;
  const jokeDone = punchline !== "" && punchlineIndex === punchline.length;

  const overlay = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const body = document.querySelector("body")!;
    body.style.overflowY = "hidden";
  }, []);

  function setFallbackJoke() {
    setQuestion("Why couldn't web developers find their room in a hotel?");
    setPunchline("Because their room number is 404");
  }

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
      .catch(() => {
        // Default to this joke if the fetching is too slow
        setFallbackJoke();
      });

    return () => clearTimeout(fetchTimeout);
  }, []);

  function fadeOutOverlay() {
    overlay.current?.classList.add("animate-slide-out");
    const body = document.querySelector("body")!;
    body.style.overflowY = "auto";
  }

  useEffect(() => {
    if (jokeDone) {
      const fadeoutTimer = setTimeout(fadeOutOverlay, 2000);
      return () => clearTimeout(fadeoutTimer);
    }
  }, [jokeDone]);

  useEffect(() => {
    if (jokeDone) {
      const startTimer = setTimeout(() => setPunchlineStart(true), 3000);
      return () => clearTimeout(startTimer);
    }
  }, [jokeDone]);

  function handleOverlayClick() {
    if (!question) {
      setFallbackJoke();
    }
    if (!questionDone) {
      return setQuestionIndex(question.length);
    }
    if (!jokeDone) {
      if (!punchlineStart) {
        return setPunchlineStart(true);
      }
      return setPunchlineIndex(punchline.length);
    }
    if (jokeDone) {
      fadeOutOverlay();
    }
  }

  if (question && punchline) {
    return (
      <div
        onClick={handleOverlayClick}
        ref={overlay}
        className="fixed z-10 flex h-full w-full flex-col items-center justify-center gap-10 bg-orange-100 lg:gap-20"
      >
        <JokeQuestion
          index={questionIndex}
          setIndex={setQuestionIndex}
          key={question}
        >
          {question}
        </JokeQuestion>
        <hr className="w-9/12 border-black" />
        <JokePunchline
          showCursor={questionDone}
          start={punchlineStart}
          index={punchlineIndex}
          setIndex={setPunchlineIndex}
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
