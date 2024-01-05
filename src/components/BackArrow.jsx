import React from "react";
import { useNavigate } from "react-router-dom";

const BackArrow = (props) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(props.navigateTo ? props.navigateTo : -1)}
      className="text-xl font-medium flex items-center gap-2 cursor-pointer"
    >
      <i className="fa-solid fa-arrow-left-long"></i>
      <p className="leading-none tracking-wide">{props.text}</p>
    </div>
  );
};

export default BackArrow;
