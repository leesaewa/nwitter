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
  Main,
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

interface IUser {
  displayName: string | null;
  photoURL: string | null;
  cover: string | null;
}

export interface ITweet {
  id: string;
  photo: string;
  cover: string;
  headline: string;
  subhead: string;
  tweet: string;
  userId: string;
  username: string;
  createdAt: number;
  avatar: string;
}

export default function Channel() {
  const { userId } = useParams<{ userId: string }>();
  const [editName, setEditName] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [coverImg, setCoverImg] = useState<string | null>(null);
  const [userTweets, setUserTweets] = useState<ITweet[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  const fetchUserProfile = async () => {
    if (!userId) return;

    try {
      const userDocRef = doc(db, "users", userId);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data() as IUser;
        setEditName(userData.displayName || "");
        setAvatar(userData.photoURL || null);
        setCoverImg(userData.cover || null);
      }
    } catch (error) {
      console.error("유저 프로필을 불러오는 중 오류 발생:", error);
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
      const tweetsData: ITweet[] = snapshot.docs.map((doc) => {
        const data = doc.data() as ITweet;
        return {
          id: doc.id,
          photo: data.photo,
          cover: data.cover,
          headline: data.headline,
          subhead: data.subhead,
          tweet: data.tweet,
          userId: data.userId,
          username: data.username,
          createdAt: data.createdAt,
          avatar: data.avatar,
        };
      });

      setUserTweets(tweetsData);
    } catch (error) {
      console.error("유저 트윗을 불러오는 중 오류 발생:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
    fetchTweets();
  }, [userId]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Main className="profile-container">
      <EditContainer>
        <UserInfo>
          <CoverWrapper>
            {coverImg && <CoverImg src={coverImg} width="1920" height="320" />}
          </CoverWrapper>

          <UserBox>
            <AvatarWrapper>
              {avatar ? (
                <AvatarImg src={avatar} alt="Avatar" />
              ) : (
                "프로필 사진 없음"
              )}
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
    </Main>
  );
}
