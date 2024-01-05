import React, { useState } from "react";
import PageWrapper from "../components/PageWrapper";
import InputField from "../components/InputField";
import CustomButton from "../components/CustomButton";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../../firebase-config";
import { toast } from "react-toastify";
import { firebaseErrorsCodes } from "../../firebaseErrorCodes";
import { DefaultToastifySettings } from "../helperfunctions/DefaultToastSettings";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleUserSignIn = async (e) => {
    setLoading(true);
    e.preventDefault();
    signInWithEmailAndPassword(FIREBASE_AUTH, userEmail, userPassword)
      .then((userCredential) => {
        navigate("/");
        setLoading(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = firebaseErrorsCodes[errorCode];
        toast.error(errorMessage, DefaultToastifySettings);
        setLoading(false);
      });
  };

  return (
    <PageWrapper>
      <div>
        <div className="text-center mt-16">
          <h1 className="text-6xl lg:text-8xl font-bebasNeue text-primaryBlack">praktikblog</h1>
          <p className="text-xl">- Christoffer Rod Greffel -</p>
        </div>
        <form
          onSubmit={handleUserSignIn}
          className="h-[calc(100vh-20rem)] justify-center flex flex-col gap-3 m-auto w-11/12 md:w-1/2"
        >
          <InputField
            text="E-mail"
            type="email"
            state={userEmail}
            setState={setUserEmail}
            placeholder="Skriv din e-mail her"
          />
          <InputField
            text="Password"
            type="password"
            state={userPassword}
            setState={setUserPassword}
            placeholder="Skriv din adgangskode her"
          />
          <div className="mt-5">
            <CustomButton text="Log Ind" loading={loading} />
          </div>
        </form>
      </div>
    </PageWrapper>
  );
};

export default SignIn;
