import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../firebase-config";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

const BlogPost = (props) => {
  const navigate = useNavigate();
  const [postRead, setPostRead] = useState();
  const currentUser = FIREBASE_AUTH.currentUser.uid;

  useEffect(() => {
    setPostRead(!props.usersRead.includes(currentUser));
  }, [props.usersRead]);

  const togglePostRead = async () => {
    const postRef = doc(FIREBASE_DB, "posts", props.id);

    if (props.usersRead.includes(currentUser)) {
      await updateDoc(postRef, {
        usersRead: arrayRemove(currentUser),
      });
    } else {
      await updateDoc(postRef, {
        usersRead: arrayUnion(currentUser),
      });
    }
  };

  return (
    <>
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
      <div
        onClick={togglePostRead}
        className="flex justify-center items-center gap-2 relative bottom-2.5 bg-darkBlue text-white font-light text-center text-lg py-2 rounded-b-lg cursor-pointer transition-all duration-100 ease-in-out"
      >
        {postRead ? (
          <>
            <p>Markér som læst</p>
            <i className="fa-regular fa-flag text-lg"></i>
          </>
        ) : (
          <>
            <p>Markér som ulæst</p>
            <i className="fa-solid fa-flag text-lg"></i>
          </>
        )}
      </div>
    </>
  );
};

export default BlogPost;
