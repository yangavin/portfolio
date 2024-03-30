import { useEffect } from "react";

function JokeQuestion({
  children,
  index,
  setIndex,
}: {
  children: string;
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  key: string;
}) {
  const displayedQuestion = children.slice(0, index);

  useEffect(() => {
    if (index < children.length) {
      const timeout = setTimeout(() => {
        setIndex((oldIndex) => oldIndex + 1);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [index]);

  return (
    <h1 className="w-3/4 text-center text-2xl md:text-3xl lg:text-7xl lg:leading-snug">
      <span>{displayedQuestion}</span>
      <span className="animate-pulse">{index < children.length && "|"}</span>
    </h1>
  );
}

export default JokeQuestion;
