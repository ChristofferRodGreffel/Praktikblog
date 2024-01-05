import React, { useState } from "react";
import PageWrapper from "../components/PageWrapper";
import BackArrow from "../components/BackArrow";
import InputField from "../components/InputField";
import CustomButton from "../components/CustomButton";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../../firebase-config";
import { DefaultToastifySettings } from "../helperfunctions/DefaultToastSettings";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [postTitle, setPostTitle] = useState("");
  const [spontanLog, setSpontanLog] = useState("");
  const [refleksionsLog, setRefleksionsLog] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const addPostToFirestore = async (e) => {
    e.preventDefault();
    setLoading(true);

    const docRef = await addDoc(collection(FIREBASE_DB, "posts"), {
      postTitle: postTitle,
      spontanLog: spontanLog,
      refleksionsLog: refleksionsLog,
      usersRead: [],
      date: new Date(),
    });

    const postRef = doc(FIREBASE_DB, "posts", docRef.id);

    await updateDoc(postRef, {
      id: docRef.id,
    })
      .then(() => {
        toast.success("Indlæg tilføjet", DefaultToastifySettings);
        setPostTitle("");
        setSpontanLog("");
        setRefleksionsLog("");
        navigate("/");
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error, DefaultToastifySettings);
      });
  };

  return (
    <PageWrapper>
      <div className="lg:w-[70%] m-auto">
        <BackArrow text="Tilbage til blog" />
        <h1 className="text-5xl font-bebasNeue text-primaryBlack leading-10 mt-10">Opret indlæg</h1>

        <form onSubmit={addPostToFirestore} className="flex flex-col gap-3 mt-5">
          <InputField
            text="Titel"
            type="text"
            placeholder="Titlen på dit indlæg"
            state={postTitle}
            setState={setPostTitle}
          />
          <InputField
            text="Spontanlog"
            type="textarea"
            placeholder="Skriv de indtryk og oplevelser som du møder under praktikarbejdet"
            textarea={true}
            state={spontanLog}
            setState={setSpontanLog}
          />
          <InputField
            text="Refleksionslog"
            type="textarea"
            placeholder="Udvælg oplevelser og indtryk fra spontanloggen og reflektér over dem"
            textarea={true}
            state={refleksionsLog}
            setState={setRefleksionsLog}
          />
          <div>
            <CustomButton text="Opret indlæg" loading={loading} />
          </div>
        </form>
      </div>
    </PageWrapper>
  );
};

export default CreatePost;
