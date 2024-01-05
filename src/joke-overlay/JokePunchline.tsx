import { useEffect, useState } from "react";

function JokePunchline({
  children,
  start,
}: {
  children: string;
  start: boolean;
  key: string;
}) {
  const [index, setIndex] = useState(0);
  const displayedPunchline = children.slice(0, index);

  useEffect(() => {
    if (index < children.length && start) {
      const timeout = setTimeout(() => {
        setIndex((oldIndex) => oldIndex + 1);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [start, index]);
  return start ? (
    <h2 className="text-center md:text-2xl lg:text-3xl">
      <span>{displayedPunchline}</span>
      <span>{index < children.length && "|"}</span>
    </h2>
  ) : (
    <h2 className="text-center md:text-2xl lg:text-3xl"></h2>
  );
}

export default JokePunchline;
