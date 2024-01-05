import React, { useEffect, useRef, useState } from "react";
import PageWrapper from "../components/PageWrapper";
import BackArrow from "../components/BackArrow";
import InputField from "../components/InputField";
import { useNavigate, useParams } from "react-router-dom";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import CustomButton from "../components/CustomButton";
import { FIREBASE_DB } from "../../firebase-config";
import { DefaultToastifySettings } from "../helperfunctions/DefaultToastSettings";
import { toast } from "react-toastify";
import Modal from "../components/Modal";

const EditPost = () => {
  const { postId } = useParams();
  const [postTitle, setPostTitle] = useState("");
  const [spontanLog, setSpontanLog] = useState("");
  const [refleksionsLog, setRefleksionsLog] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getPostFromFirestore = async () => {
      const docRef = doc(FIREBASE_DB, "posts", postId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setPostTitle(docSnap.data().postTitle);
        setSpontanLog(docSnap.data().spontanLog);
        setRefleksionsLog(docSnap.data().refleksionsLog);
      } else {
        console.log("No such document!");
      }
    };
    getPostFromFirestore();
  }, [postId]);

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    setLoading(true);

    const postRef = doc(FIREBASE_DB, "posts", postId);

    await updateDoc(postRef, {
      postTitle: postTitle,
      spontanLog: spontanLog,
      refleksionsLog: refleksionsLog,
    })
      .then(() => {
        toast.success("Indlæg opdateret", DefaultToastifySettings);
        setPostTitle("");
        setSpontanLog("");
        setRefleksionsLog("");
        formRef.current.reset();
        navigate("/");
        setLoading(false);
      })
      .catch((error) => {
        toast.error("Indlæg ikke opdateret", DefaultToastifySettings);
        console.log(error);
      });
  };

  const handleOpenModal = async () => {
    setShowModal(true);
  };

  const handleDeletePost = async () => {
    await deleteDoc(doc(FIREBASE_DB, "posts", postId)).then(() => {
      toast.success("Indlæg slettet", DefaultToastifySettings);
      navigate("/");
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <PageWrapper>
      <Modal
        modalText="Du er ved at slette et indlæg. Vil du fortsætte?"
        function={handleDeletePost}
        handleCloseModal={handleCloseModal}
        modalOpen={showModal}
      />

      <div className="lg:w-[70%] m-auto">
        <BackArrow text="Tilbage til blog" />
        <div className="flex justify-between items-center mt-10">
          <h1 className="text-4xl lg:text-5xl font-bebasNeue text-primaryBlack leading-10">Rediger indlæg</h1>
          <div
            onClick={handleOpenModal}
            className="flex items-center gap-2 bg-red-800 text-primaryWhite p-2.5 rounded-lg cursor-pointer transition-all duration-100 ease-in-out hover:bg-red-700"
          >
            <p className="font-medium">Slet indlæg</p>
            <i className="fa-solid fa-trash text-"></i>
          </div>
        </div>

        <form ref={formRef} onSubmit={handleUpdatePost} className="flex flex-col gap-3 mt-5">
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

export default EditPost;
