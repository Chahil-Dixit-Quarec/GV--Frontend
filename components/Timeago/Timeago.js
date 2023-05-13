import React, { useState, useEffect } from "react";

function TimeAgo({ timestamp }) {
  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      const secondsAgo = Math.floor((new Date() - new Date(timestamp)) / 1000);
      let interval = Math.floor(secondsAgo / 31536000);
      if (interval > 1) {
        setTimeAgo(`${interval} years ago`);
        return;
      }
      interval = Math.floor(secondsAgo / 2592000);
      if (interval > 1) {
        setTimeAgo(`${interval} months ago`);
        // setTimeAgo(`${interval} months ago`);
        return;
      }
      interval = Math.floor(secondsAgo / 86400);
      if (interval > 1) {
        setTimeAgo(`${interval} days ago`);
        // setTimeAgo(`${interval} days ago`);
        return;
      }
      interval = Math.floor(secondsAgo / 3600);
      if (interval > 1) {
        setTimeAgo(`${interval} hours ago`);
        // setTimeAgo(`${interval} hours ago`);
        return;
      }
      interval = Math.floor(secondsAgo / 60);
      if (interval > 1) {
        setTimeAgo(`${interval} minutes ago`);
        // setTimeAgo(`${interval} minutes ago`);
        return;
      }
      setTimeAgo(`${Math.floor(secondsAgo)} seconds ago`);
    //   setTimeAgo(`${Math.floor(secondsAgo)} seconds ago`);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timestamp]);

  return <span>{timeAgo}</span>;
}

export default TimeAgo;
