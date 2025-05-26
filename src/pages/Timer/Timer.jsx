import React, { useEffect, useState } from "react";

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  const [isEnded, setIsEnded] = useState(false);

  useEffect(() => {
    if (!targetDate || isNaN(targetDate)) {
      console.error(
        "Invalid targetDate provided to CountdownTimer:",
        targetDate
      );
      setIsEnded(true);
      return;
    }

    calculateTimeLeft();

    const interval = setInterval(calculateTimeLeft, 1000);

    function calculateTimeLeft() {
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
    }

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
        <button
          type="button"
          onClick={() => (window.location.href = "/signin")}
          className="uppercase px-6 py-3 rounded-tr-[10px] rounded-bl-[10px] font-bold text-[15px] black_color bg-white cursor-pointer relative overflow-hidden transition-all duration-300 ease-out hover:shadow-lg hover:-translate-y-1 hover:rounded-tl-[10px] hover:rounded-br-[10px] hover:rounded-tr-none hover:rounded-bl-none group"
        >
          <span className="relative z-10 transition-colors duration-300 group-hover:text-white inline-block group-hover:scale-110 transform origin-center">
            register now
          </span>
          <span className="absolute inset-0 bg-black w-full transition-transform duration-300 transform scale-x-0 origin-left group-hover:scale-x-100"></span>
        </button>
      </div>
    </div>
  );
};

export default CountdownTimer;
