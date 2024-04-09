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
import NoData from "../components/common/NoData";
import Left from "../components/common/Left";
import {
  EditContainer,
  Container,
  AvatarImg,
  AvatarWrapper,
  CoverImg,
  Name,
  UserInfo,
  CoverWrapper,
  UserBox,
} from "../style/Profile";

export default function Channel() {
  const { userId } = useParams(); // URL에서 userId 가져오기
  // const [userProfile, setUserProfile] = useState(null);
  const [userTweets, setUserTweets] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [editName, setEditName] = useState(userId?.displayName || "");
  const [avatar, setAvatar] = useState(userId?.photoURL);
  // const [coverImg, setCoverImg] = useState(userId?.cover || "");
  const [coverImg, setCoverImg] = useState(null);

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
      <EditContainer>
        <UserInfo>
          <CoverWrapper>
            {coverImg ? (
              <CoverImg src={coverImg} width="1920" height="320" />
            ) : null}
          </CoverWrapper>

          <UserBox>
            <AvatarWrapper>
              {avatar ? <AvatarImg src={avatar} alt="Avatar" /> : "no"}
            </AvatarWrapper>
            <Name>
              {editName} <em className="eng">'s Channel</em>
            </Name>
          </UserBox>
        </UserInfo>
      </EditContainer>

      <Container>
        <Left />
        {userTweets.length > 0 ? (
          userTweets.map((tweet) => <Tweet key={tweet.id} {...tweet} />)
        ) : (
          <NoData />
        )}
      </Container>
    </div>
  );
}
