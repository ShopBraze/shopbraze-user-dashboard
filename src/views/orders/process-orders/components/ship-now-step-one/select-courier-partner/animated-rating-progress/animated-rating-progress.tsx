import { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";

const AnimatedRatingProgress = ({ rating }: { rating: number }) => {
  const [progress, setProgress] = useState(0);
  const value = (rating / 5) * 100;
  const displayText = rating?.toFixed(1);

  useEffect(() => {
    const timeout = setTimeout(() => setProgress(value), 100);
    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <div className="h-14 w-14 text-sm">
      <CircularProgressbar
        value={progress}
        text={displayText}
        styles={{
          path: {
            stroke: "#60b636",
            strokeLinecap: "round",
            transition: "stroke-dashoffset 1.5s ease 0s",
          },
          trail: {
            stroke: "#d6d6d6",
          },
          text: {
            fill: "#000",
            fontWeight: 700,
            fontSize: 28,
          },
        }}
      />
    </div>
  );
};

export default AnimatedRatingProgress
