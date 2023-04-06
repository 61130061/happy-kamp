import { useState, useEffect } from 'react';

type PropsType = {
  announcements: string[];
};

export default function Announcement({ announcements }: PropsType) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((index + 1) % announcements.length);
    }, 10000);

    return () => clearInterval(intervalId);
  }, [index, announcements]);

  const announcement = announcements[index]; 

  return (
    <div className="text-center tracking-widest text-white bg-primary-1 py-3">
      <div className="flex justify-center items-center">
        <span key={index} className="fade-in-out">{announcement}</span>
      </div>
      <style jsx>{`
        .fade-in-out {
          opacity: 0;
          animation: fade-in-out 10s ease-in-out forwards;
        }

        @keyframes fade-in-out {
          0% {
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
