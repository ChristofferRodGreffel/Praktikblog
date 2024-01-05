import React, { useEffect, useState } from "react";
import PageWrapper from "../components/PageWrapper";
import BlogPost from "../components/BlogPost";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../firebase-config";
import { collection, getDocs, onSnapshot, query } from "firebase/firestore";
import { timestampConvert } from "../helperfunctions/TimestampConvert";

const Blog = () => {
  const [userIsAdmin, setUserIsAdmin] = useState();
  const [blogPosts, setBlogPosts] = useState([]);
  const [postsLoaded, setPostsLoaded] = useState(false);

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
    querySnapshot.forEach((doc) => {
      if (doc.id === user) {
        setUserIsAdmin(true);
      } else {
        setUserIsAdmin(false);
      }
    });
  };

  const getPostsFromFirestore = async () => {
    const q = query(collection(FIREBASE_DB, "posts"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const posts = [];
      querySnapshot.forEach((doc) => {
        posts.push(doc.data());
      });
      setBlogPosts(posts);
      setPostsLoaded(true);
    });
  };

  useEffect(() => {
    if (blogPosts.length > 0 && postsLoaded) {
      sortPosts("newest");
      setPostsLoaded(false);
    }
  }, [postsLoaded]);

  const sortPosts = async (sortType) => {
    const arrayToSort = [...blogPosts];

    const compareFunction = (a, b) => {
      const dateComparison = new Date(b.date.seconds) - new Date(a.date.seconds);

      if (sortType === "newest") {
        return dateComparison;
      } else if (sortType === "oldest") {
        return -dateComparison;
      }

      return 0; // Default case
    };

    const sortedPosts = arrayToSort.sort(compareFunction);
    setBlogPosts(sortedPosts);
  };

  return (
    <>
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
          <div className="mt-10 m-auto">
            <div>
              <div className="flex justify-between items-end mb-2">
                <h2 className="text-[2rem] leading-8 font-bebasNeue justify-self-end">
                  Alle indlæg {`(${blogPosts.length})`}
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
                <p className="text-lg font-light">Der er endnu ingen indlæg...</p>
              )}
            </div>
          </div>
        </div>
      </PageWrapper>
    </>
  );
};

export default Blog;