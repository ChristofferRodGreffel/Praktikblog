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

  const handleHideInfoBar = (e) => {
    e.stopPropagation();
    setShowInfoBar(false);
  };

  return (
    <div
      className={`fixed z-50 top-0 p-2.5 w-full bg-primaryBlueShaded text-white text-center cursor-pointer transition-all duration-300 ease-in-out ${
        showInfoBar ? "opacity-100 translate-x-0" : "opacity-0 -translate-y-20"
      }`}
      onClick={handleGoToUnread}
    >
      <div className="flex justify-between items-center w-full">
        <p className="justify-self-center w-full">{props.text}</p>
        <i onClick={(e) => handleHideInfoBar(e)} className="fa-solid fa-xmark text-2xl mr-4"></i>
      </div>
    </div>
  );
};

export default TopInfoBar;
