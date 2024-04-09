import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  getDocs,
  collection,
  orderBy,
  query,
  where,
  limit,
  doc,
  getDoc,
} from "firebase/firestore";
import Tweet from "../components/tweet";
import { useParams } from "react-router-dom";
import LoadingScreen from "../components/loading-screen";

export default function Channel() {
  const { userId } = useParams(); // URL에서 userId 가져오기
  // const [userProfile, setUserProfile] = useState(null);
  const [userTweets, setUserTweets] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [editName, setEditName] = useState(userId?.displayName || "");
  const [avatar, setAvatar] = useState(userId?.photoURL);
  const [coverImg, setCoverImg] = useState(userId?.cover || "");

  const fetchUserProfile = async () => {
    try {
      const userDocRef = doc(db, "users", userId);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        setEditName(userData.displayName || "");
        setAvatar(userData.photoURL || "");
        setCoverImg(userData.cover || "");
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const fetchTweets = async () => {
    try {
      const tweetQuery = query(
        collection(db, "tweets"),
        where("userId", "==", userId),
        orderBy("createdAt", "desc"),
        limit(25)
      );
      const snapshot = await getDocs(tweetQuery);
      const tweetsData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUserTweets(tweetsData);
    } catch (error) {
      console.error("Error fetching user tweets:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTweets();
    fetchUserProfile();
    setLoading(false);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <div>
        <div>
          <span>{editName}</span>
          {avatar ? <img src={avatar} alt="Avatar" /> : "유저 아바타 없음"}
          {coverImg && <img src={coverImg} />}
        </div>

        <hr />
        <hr />

        {userTweets.length > 0 ? (
          userTweets.map((tweet) => <Tweet key={tweet.id} {...tweet} />)
        ) : (
          <span>Not Yet!</span>
        )}
      </div>
    </div>
  );
}
