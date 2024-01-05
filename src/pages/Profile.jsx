import React from "react";
import PageWrapper from "../components/PageWrapper";
import BackArrow from "../components/BackArrow";

const Profile = () => {
  return (
    <PageWrapper>
      <div className="lg:w-[70%] m-auto">
        <BackArrow text="Tilbage til blog" navigateTo="/blog" />
        <h1 className="text-5xl lg:text-6xl font-bebasNeue text-primaryBlack leading-10 mt-10">Profil</h1>
      </div>
    </PageWrapper>
  );
};

export default Profile;
