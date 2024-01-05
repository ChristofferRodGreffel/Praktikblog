import { signOut } from "firebase/auth";
import React from "react";
import { FIREBASE_AUTH } from "../../firebase-config";
import { useNavigate } from "react-router-dom";

const Header = (props) => {
  const navigate = useNavigate();

  const handleUserSignOut = () => {
    signOut(FIREBASE_AUTH)
      .then(() => {
        navigate("/signin");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleOpenMail = () => {
    location.href = "mailto:eaacrg@students.eaaa.dk";
  };

  return (
    <>
      {props?.userIsAdmin ? (
        <header className="flex justify-between w-[90%] m-auto mt-7 cursor-pointer">
          <div onClick={() => navigate("/profile")} className="flex flex-col items-center relative group">
            <div className="flex justify-center items-center bg-primaryGrey rounded-full h-11 w-11 transition-all ease-in-out duration-100 md:hover:bg-primaryBlack">
              <i className="fa-solid fa-user-lock text-primaryWhite text-lg"></i>
            </div>
            <div className="absolute w-fit -bottom-7 whitespace-nowrap opacity-0 transition-all duration-75 transform scale-0 origin-top-center md:group-hover:opacity-100 md:group-hover:scale-100">
              Brugerprofil
            </div>
          </div>
          <div className="flex gap-3 cursor-pointer">
            <div className="flex flex-col items-center relative group">
              <div
                onClick={() => navigate("/createpost")}
                className="flex justify-center items-center bg-primaryBlue rounded-full h-11 w-11 transition-all ease-in-out duration-100 md:hover:bg-primaryBlack"
              >
                <i className="fa-solid fa-file-circle-plus text-primaryWhite text-lg"></i>
              </div>
              <div className="absolute w-fit -bottom-7 whitespace-nowrap opacity-0 transition-all duration-75 transform scale-0 origin-top-center md:group-hover:opacity-100 md:group-hover:scale-100">
                Opret indlæg
              </div>
            </div>
            <div className="flex flex-col items-center relative group">
              <div
                onClick={handleUserSignOut}
                className="flex justify-center items-center bg-primaryGrey rounded-full h-11 w-11 transition-all ease-in-out duration-100 md:hover:bg-red-800"
              >
                <i className="fa-solid fa-right-from-bracket text-primaryWhite text-lg"></i>
              </div>
              <div className="absolute w-fit -bottom-7 whitespace-nowrap opacity-0 transition-all duration-75 transform scale-0 origin-top-center md:group-hover:opacity-100 md:group-hover:scale-100">
                Log ud
              </div>
            </div>
          </div>
        </header>
      ) : (
        <header className="flex justify-between w-[90%] m-auto mt-7">
          <div className="flex flex-col items-center relative group">
            <div className="flex justify-center items-center bg-primaryGrey rounded-full h-11 w-11 cursor-pointer transition-all ease-in-out duration-100 md:hover:bg-primaryBlack">
              <i className="fa-solid fa-user text-primaryWhite text-lg"></i>
            </div>
            <div className="absolute w-fit -bottom-7 whitespace-nowrap opacity-0 transition-all duration-75 transform scale-0 origin-top-center md:group-hover:opacity-100 md:group-hover:scale-100">
              Brugerprofil
            </div>
          </div>
          <div className="flex gap-3 cursor-pointer">
            <div className="flex flex-col items-center relative group">
              <div
                onClick={handleOpenMail}
                className="flex justify-center items-center bg-primaryGrey rounded-full h-11 w-11 cursor-pointer transition-all ease-in-out duration-100 md:hover:bg-primaryBlue"
              >
                <i className="fa-solid fa-paper-plane text-primaryWhite text-lg relative right-0.5"></i>
              </div>
              <div className="absolute w-fit -bottom-7 whitespace-nowrap opacity-0 transition-all duration-75 transform scale-0 origin-top-center md:group-hover:opacity-100 md:group-hover:scale-100">
                Skriv til mig
              </div>
            </div>
            <div className="flex flex-col items-center relative group">
              <div
                onClick={handleUserSignOut}
                className="flex justify-center items-center bg-primaryGrey rounded-full h-11 w-11 cursor-pointer transition-all ease-in-out duration-100 md:hover:bg-red-800"
              >
                <i className="fa-solid fa-right-from-bracket text-primaryWhite text-lg"></i>
              </div>
              <div className="absolute w-fit -bottom-7 whitespace-nowrap opacity-0 transition-all duration-75 transform scale-0 origin-top-center md:group-hover:opacity-100 md:group-hover:scale-100">
                Log ud
              </div>
            </div>
          </div>
        </header>
      )}
    </>
  );
};

export default Header;
