import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Timer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  const [isEnded, setIsEnded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        clearInterval(interval);
        setIsEnded(true);
        return;
      }

      const days = String(
        Math.floor(distance / (1000 * 60 * 60 * 24))
      ).padStart(2, "0");
      const hours = String(
        Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      ).padStart(2, "0");
      const minutes = String(
        Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      ).padStart(2, "0");
      const seconds = String(
        Math.floor((distance % (1000 * 60)) / 1000)
      ).padStart(2, "0");

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="sm:mt-10 mt-6">
      <div>
        <div className="timer" id="conference-timer">
          {!isEnded ? (
            <div
              className="countdown flex items-center md:gap-8 gap-8 sm:gap-20"
              id="countdown-timer"
            >
              {["days", "hours", "minutes", "seconds"].map((unit) => (
                <div
                  key={unit}
                  className="time-box flex flex-col items-center md:border lg:pb-8 md:pb-4 md:px-4 rounded-tr-[10px] rounded-bl-[10px]"
                >
                  <div className="time-value text-white lg:text-[60px] xl:text-[70px] text-[30px] sm:text-[54px] md:text-[58px] font-bold leading-normal text-cap">
                    {timeLeft[unit]}
                  </div>
                  <div className="time-label lg:text-[25px] md:text-[18px] text-[15px] text-white leading-[4px] font-normal">
                    {unit.charAt(0).toUpperCase() + unit.slice(1)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-white text-[30px]" id="timer-ended">
              17th TCS Annual Conference & Workshop - 2025 has been ended.
            </p>
          )}
        </div>
      </div>
      <div className="mt-10 flex items-center lg:justify-start justify-center">
        <Link to="/event2025/dashboard">
          <span className="uppercase px-6 py-3 rounded-tr-[10px] rounded-bl-[10px] font-bold text-[15px] black_color bg-white">
            register now
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Timer;
