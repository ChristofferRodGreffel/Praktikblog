import React from "react";
import { BeatLoader } from "react-spinners";

const CustomButton = (props) => {
  return (
    <button
      onClick={props.function}
      className="w-full bg-primaryBlue text-white p-3 rounded-lg text-xl font-semibold transition-colors duration-100 ease-in-out hover:bg-primaryBlack"
    >
      {props.loading ? <BeatLoader color="#ffffff" size={13} /> : props.text}
    </button>
  );
};

export default CustomButton;
