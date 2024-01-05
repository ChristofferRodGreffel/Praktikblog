import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH, FIREBASE_DB } from "../firebase-config";
import Blog from "./pages/Blog";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignIn from "./pages/SignIn";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import Header from "./components/Header";
import ScrollToTop from "./helperfunctions/ScrollToTop";
import { collection, getDocs } from "firebase/firestore";
import Profile from "./pages/Profile";
import TopInfoBar from "./components/TopInfoBar";

function App() {
  const [userIsAdmin, setUserIsAdmin] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        setUserLoggedIn(true);
        checkAdminStatus(user.uid);
      } else {
        setUserLoggedIn(false);
        navigate("/signin");
      }
    });
  }, []);

  const checkAdminStatus = async (user) => {
    const querySnapshot = await getDocs(collection(FIREBASE_DB, "admin"));

    let isAdmin = false;

    querySnapshot.forEach((doc) => {
      if (doc.id === user) {
        isAdmin = true;
        setUserIsAdmin(true);
      }
    });

    if (!isAdmin) {
      setUserIsAdmin(false);
    }
  };

  return (
    <>
      <ScrollToTop />
      <ToastContainer userIsAdmin={userIsAdmin} />
      {userLoggedIn && <Header userIsAdmin={userIsAdmin} />}
      <Routes>
        {userIsAdmin && (
          <>
            <Route path="/editpost/:postId" element={<EditPost />} />
            <Route path="/createpost" element={<CreatePost />} />
          </>
        )}
        <Route path="/" element={<Blog />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="*" element={<Blog />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
