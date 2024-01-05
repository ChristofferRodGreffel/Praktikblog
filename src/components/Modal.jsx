import React from "react";

const Modal = (props) => {
  return (
    <div
      className={`flex flex-col gap-10 justify-between fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[45%] lg:w-[30%] p-10 bg-primaryBlue text-primaryWhite drop-shadow-xl rounded-lg opacity-0 transition-all duration-200 ease-in-out origin-center ${
        props.modalOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
      }`}
    >
      <p className="text-center text-2xl font-light text-balance">{props.modalText}</p>
      <div className="flex justify-center gap-5">
        <button
          onClick={props.function}
          className="flex items-center gap-2 bg-primaryWhite text-xl text-primaryBlack px-10 py-2 font-semibold rounded-lg"
        >
          <i className="fa-solid fa-check text-green-700 text-2xl"></i> Ja
        </button>
        <button
          onClick={props.handleCloseModal}
          className="flex items-center gap-2 bg-primaryWhite text-xl text-primaryBlack px-10 py-2 font-semibold rounded-lg "
        >
          <i className="fa-solid fa-xmark text-red-800 text-2xl"></i> Nej
        </button>
      </div>
    </div>
  );
};

export default Modal;
