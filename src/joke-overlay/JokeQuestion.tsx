import { useEffect, useState } from "react";

function JokeQuestion({
  children,
  setDone,
}: {
  children: string;
  setDone: (done: boolean) => void;
  key: string;
}) {
  const [index, setIndex] = useState(0);
  const displayedQuestion = children.slice(0, index);

  useEffect(() => {
    if (index < children.length) {
      setDone(false);
      const timeout = setTimeout(() => {
        setIndex((oldIndex) => oldIndex + 1);
      }, 50);
      return () => clearTimeout(timeout);
    }
    setDone(true);
  }, [index]);

  return (
    <h1 className="w-3/4 text-center text-2xl md:text-3xl lg:text-7xl lg:leading-snug">
      <span>{displayedQuestion}</span>
      <span>{index < children.length && "|"}</span>
    </h1>
  );
}

export default JokeQuestion;
