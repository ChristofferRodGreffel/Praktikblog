import React, { useEffect, useRef, useState } from "react";
import PageWrapper from "../components/PageWrapper";
import BlogPost from "../components/BlogPost";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../firebase-config";
import { collection, getDocs, onSnapshot, query } from "firebase/firestore";
import { timestampConvert } from "../helperfunctions/TimestampConvert";
import TopInfoBar from "../components/TopInfoBar";
import CustomButton from "../components/CustomButton";

const Blog = () => {
  const [userIsAdmin, setUserIsAdmin] = useState();
  const [originalBlogPosts, setOriginalBlogPosts] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [postsLoaded, setPostsLoaded] = useState(false);
  const [unread, setUnread] = useState(0);
  const postsRef = useRef(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        checkAdminStatus(user.uid);
        getPostsFromFirestore();
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

  const getPostsFromFirestore = async () => {
    const q = query(collection(FIREBASE_DB, "posts"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const posts = [];
      querySnapshot.forEach((doc) => {
        posts.push(doc.data());
      });
      setBlogPosts(posts);
      setOriginalBlogPosts(posts);
      setPostsLoaded(true);
    });
  };

  useEffect(() => {
    if (blogPosts.length > 0 && postsLoaded) {
      if (localStorage.getItem("sortType") !== null) {
        const chosenSortType = localStorage.getItem("sortType");
        sortPosts(chosenSortType);
      } else {
        sortPosts("newest");
      }
      setPostsLoaded(false);

      let currentUnread = 0;
      blogPosts.forEach((post) => {
        if (!post.usersRead.includes(FIREBASE_AUTH.currentUser.uid)) {
          currentUnread++;
        }
      });
      setUnread(currentUnread);
    }
  }, [postsLoaded]);

  const sortPosts = async (sortType, isTopBarClicked) => {
    const arrayToSort = [...originalBlogPosts];
    const filterOptions = document.querySelector("#filterOptions");

    if (sortType === "unread") {
      filterOptions.value = "unread";
      const sortedArray = [];
      blogPosts.forEach((post) => {
        if (!post.usersRead.includes(FIREBASE_AUTH.currentUser.uid)) {
          sortedArray.push(post);
        }
      });
      setBlogPosts(sortedArray);
      localStorage.setItem("sortType", "unread");

      if (isTopBarClicked) {
        postsRef.current.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      const compareFunction = (a, b) => {
        const dateComparison = new Date(b.date.seconds) - new Date(a.date.seconds);

        if (sortType === "newest") {
          localStorage.setItem("sortType", "newest");
          filterOptions.value = "newest";
          return dateComparison;
        } else if (sortType === "oldest") {
          localStorage.setItem("sortType", "oldest");
          filterOptions.value = "oldest";
          return -dateComparison;
        }

        return 0; // Default case
      };

      const sortedPosts = arrayToSort.sort(compareFunction);
      setBlogPosts(sortedPosts);
    }
  };

  return (
    <>
      {!userIsAdmin && unread > 0 && (
        <TopInfoBar
          text={`Du har ${unread} ulæst(e) indlæg - tryk for at læse`}
          function={() => sortPosts("unread", true)}
        />
      )}
      <PageWrapper>
        <div className="lg:w-[70%] m-auto">
          <div>
            <h1 className="text-5xl lg:text-6xl font-bebasNeue text-primaryBlack leading-10">Praktikblog</h1>
            <p className="text-lg">Christoffer Rod Greffel</p>
          </div>
          <div className="text-lg mt-5">
            <div className="flex gap-2">
              <p className="font-bold">Virksomhed:</p>
              <p>Maulund A/S</p>
            </div>
            <div className="flex gap-2">
              <p className="font-bold">Arbejdsområde:</p>
              <p>Frontendudvikling</p>
            </div>
          </div>
          <div ref={postsRef} className="mt-10 m-auto">
            <div>
              <div className="flex justify-between items-end mb-2">
                <h2 className="text-[2rem] leading-8 font-bebasNeue justify-self-end">
                  Alle indlæg {`(${originalBlogPosts.length})`}
                </h2>
                <select
                  onChange={(e) => sortPosts(e.target.value)}
                  name="filterOptions"
                  defaultValue={"newest"}
                  id="filterOptions"
                  className="items-center border-2 border-primaryBlack p-1.5 rounded-lg text-lg select"
                >
                  <option value="newest">Nyeste først</option>
                  <option value="oldest">Ældste først</option>
                  <option value="unread">Ulæste indlæg</option>
                </select>
              </div>
              <hr className="border-t-2 border-primaryGrey rounded-full" />
            </div>
            <div className="flex flex-col gap-5 mt-5">
              {blogPosts.length > 0 ? (
                <>
                  {blogPosts?.map((post, key) => {
                    return (
                      <div key={key}>
                        <BlogPost
                          id={post.id}
                          usersRead={post.usersRead}
                          title={post.postTitle}
                          date={timestampConvert(post.date.seconds, "stampToDate")}
                          time={timestampConvert(post.date.seconds, "stampToHourMinute")}
                          spontanLog={post.spontanLog}
                          admin={userIsAdmin}
                          refleksionsLog={post.refleksionsLog}
                        />
                      </div>
                    );
                  })}
                </>
              ) : (
                <>
                  {unread == 0 && originalBlogPosts.length > 0 ? (
                    <>
                      <p className="text-lg italic">Du har ingen ulæste indlæg...</p>
                      <CustomButton text="Se nyeste indlæg" function={() => sortPosts("newest")} />
                    </>
                  ) : (
                    <p className="text-lg italic">Der er endnu ingen indlæg...</p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </PageWrapper>
    </>
  );
};

export default Blog;
