import { useEffect, useState } from "react";

function JokePunchline({
  children,
  showCursor,
  index,
  setIndex,
}: {
  children: string;
  showCursor: boolean;
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  key: string;
}) {
  const [start, setStart] = useState(false);
  const displayedPunchline = children.slice(0, index);

  useEffect(() => {
    if (showCursor) {
      const startTimer = setTimeout(() => setStart(true), 3000);
      return () => clearTimeout(startTimer);
    }
  }, [showCursor]);

  useEffect(() => {
    if (start && index < children.length) {
      const nextCharTimer = setTimeout(() => {
        setIndex((oldIndex) => oldIndex + 1);
      }, 50);
      return () => clearTimeout(nextCharTimer);
    }
  }, [start, index]);

  return (
    <h2 className="text-center md:text-2xl lg:text-3xl">
      {showCursor && (
        <>
          <span>{displayedPunchline}</span>
          <span className="animate-pulse">|</span>
        </>
      )}
    </h2>
  );
}

export default JokePunchline;
