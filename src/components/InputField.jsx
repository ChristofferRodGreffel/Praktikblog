import React from "react";

const InputField = (props) => {
  return (
    <>
      {props.textarea ? (
        <div>
          <p className="text-lg mb-1 font-semibold">{props.text}</p>
          <textarea
            className="rounded-md p-3 border-2 border-primaryGrey w-full focus:border-primaryBlue focus:border-2 focus:outline-none"
            onChange={(e) => props.setState(e.target.value)}
            placeholder={props.placeholder}
            defaultValue={props.state}
            required
            cols={34}
            rows={10}
          ></textarea>
        </div>
      ) : (
        <div>
          <p className="text-lg mb-1 font-semibold">{props.text}</p>
          <input
            onChange={(e) => props.setState(e.target.value)}
            defaultValue={props.state}
            required
            className="rounded-md p-3 border-2 border-primaryGrey w-full focus:border-primaryBlue focus:border-2 focus:outline-none"
            type={props.type}
            placeholder={props.placeholder}
          />
        </div>
      )}
    </>
  );
};

export default InputField;
