import React, { useEffect, useState } from "react";
import "./WelcomeAnimation.css";
import welcomeImage from "../assests/images/Welcome.png"; // Ensure the correct path

function WelcomeAnimation() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 20000); // 10 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null; // Hide animation after 10 seconds

  return (
    <div className="welcome-container">
      <img src={welcomeImage} alt="Welcome" className="welcome-image" />
    </div>
  );
}

export default WelcomeAnimation;
