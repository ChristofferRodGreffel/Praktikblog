import React from "react";
import { useNavigate } from "react-router-dom";

const BlogPost = (props) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-5 p-5 lg:p-8 text-white blueGradient rounded-lg">
      <div>
        <div className="flex gap-3 items-center justify-between">
          <h1 className="font-medium text-2xl">{props.title}</h1>
          {props?.admin && (
            <i
              onClick={() => navigate(`/editpost/${props.id}`)}
              className="fa-regular fa-pen-to-square text-3xl cursor-pointer transition-all duration-100 ease-in-out hover:text-primaryBlack"
            ></i>
          )}
        </div>
        <div className="flex gap-5 font-light">
          <p>{props.date}</p>
          <p>kl. {props.time}</p>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-5 mb-2">
        <div className="lg:flex-1">
          <div>
            <h2 className="text-lg font-semibold">Spontanlog</h2>
            <hr />
          </div>
          <p className="w-full text-white font-light focus:outline-none mt-2 leading-7 whitespace-pre-wrap">
            {props.spontanLog}
          </p>
        </div>
        <div className="lg:w-[60%]">
          <h2 className="text-lg font-semibold">Refleksionslog</h2>
          <hr />
          <p className="w-full text-white font-light focus:outline-none mt-2 leading-7 whitespace-pre-wrap">
            {props.refleksionsLog}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
