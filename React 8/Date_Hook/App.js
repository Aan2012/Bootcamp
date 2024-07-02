import './style.css';
import React, { useState, useEffect } from 'react';

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Cleanup function to clear interval
    return () => {
      clearInterval(timer);
    };
  }, []); // Empty dependency array ensures effect runs only on mount and unmount

  // Format the time as hh:mm:ss
  const formattedTime = time.toLocaleTimeString();

  return (
    <div>
      <h1>Current Time:</h1>
      <h2>{formattedTime}</h2>
    </div>
  );
};

export default Clock;
