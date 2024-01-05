import React, { useEffect, useState } from "react";

const TopInfoBar = (props) => {
  const [showInfoBar, setShowInfoBar] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowInfoBar(true);
    }, 2500);
  }, []);

  const handleGoToUnread = () => {
    setShowInfoBar((prevShowInforBar) => !prevShowInforBar);
    props.function();
  };

  return (
    <div
      className={`absolute top-0 p-3 w-full bg-primaryBlueShaded text-white text-center cursor-pointer transition-all duration-300 ease-in-out ${
        showInfoBar ? "opacity-100 translate-x-0" : "opacity-0 -translate-y-20"
      }`}
      onClick={handleGoToUnread}
    >
      {props.text}
    </div>
  );
};

export default TopInfoBar;
