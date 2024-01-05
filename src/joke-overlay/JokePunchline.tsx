import { useEffect, useState } from "react";

function JokePunchline({ punchline }: { punchline: string; key: string }) {
  const [index, setIndex] = useState(0);
  const displayedPunchline = punchline.slice(0, index);
  useEffect(() => {
    if (index < punchline.length) {
      const timeout = setTimeout(() => {
        setIndex((oldIndex) => oldIndex + 1);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [index]);
  return (
    <h2 className="text-center md:text-2xl lg:text-3xl">
      <span>{displayedPunchline}</span>
      <span>{index < punchline.length && "|"}</span>
    </h2>
  );
}

export default JokePunchline;
