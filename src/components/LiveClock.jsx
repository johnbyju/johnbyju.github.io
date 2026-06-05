import React, { useState, useEffect } from 'react';

export default function LiveClock() {
  const [timeData, setTimeData] = useState({
    time: '',
    ampm: '',
    date: ''
  });

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      
      const timeFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
      
      const dateFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Kolkata',
        month: 'long',
        day: 'numeric',
      });

      const formattedTime = timeFormatter.format(now); // e.g. "07:52 PM" or with narrow non-breaking spaces
      const parts = formattedTime.split(/\s+/);
      const time = parts[0];
      const ampm = (parts[1] || '').toLowerCase();
      const date = dateFormatter.format(now);

      setTimeData({ time, ampm, date });
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="live-clock">
      <p className="clock-time">{timeData.time}</p>
      <div className="clock-meta">
        <p className="clock-ampm">{timeData.ampm}</p>
        <p className="clock-date">{timeData.date}</p>
      </div>
    </div>
  );
}
