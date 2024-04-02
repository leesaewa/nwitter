import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  getDocs,
  collection,
  orderBy,
  query,
  where,
  limit,
} from "firebase/firestore";
import Tweet from "../components/tweet";
import { useParams } from "react-router-dom";
import LoadingScreen from "../components/loading-screen";

export default function Channel() {
  const { userId } = useParams(); // URL에서 userId 가져오기
  const [userProfile, setUserProfile] = useState(null);
  const [userTweets, setUserTweets] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const fetchUserProfile = async () => {
    try {
      const tweetQuery = query(
        collection(db, "tweets"),
        where("userId", "==", userId),
        limit(1) // 한 번에 하나의 트윗만 가져옴
      );
      const snapshot = await getDocs(tweetQuery);
      if (!snapshot.empty) {
        const userData = snapshot.docs[0].data();
        setUserProfile({
          username: userData.username || "Anonymous",
          avatar: userData.avatar || null,
        });
      } else {
        console.log("User not found");
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
    setLoading(false);
    fetchUserProfile();
    fetchTweets();
  }, [userId]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <div>
        {userProfile && (
          <div>
            <span>{userProfile.username}</span>
            {userProfile.avatar ? (
              <img src={userProfile.avatar} alt="Avatar" />
            ) : (
              "유저 아바타 없음"
            )}
            {/* 추가된 부분: avatar photoUrl 출력 */}
          </div>
        )}

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
