import React, { useEffect, useState } from "react";
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { updateProfile, User as FirebaseUser } from "firebase/auth";
import { ITweet } from "../components/timeline";
import Tweet from "../components/tweet";
import LoadingScreen from "../components/loading-screen";
import { HiUser, HiOutlineCog, HiOutlineCheck, HiX } from "react-icons/hi";
import Left from "../components/common/Left";
import {
  Main,
  Container,
  AvatarImg,
  AvatarInput,
  AvatarUpload,
  AvatarWrapper,
  ButtonContainer,
  CoverImg,
  CoverInput,
  CoverUpload,
  EditBtn,
  EditContainer,
  Name,
  NameInput,
  Tweets,
  UserInfo,
  CoverWrapper,
  UserBox,
} from "../style/Profile";
import NoData from "../components/common/NoData";

interface User {
  uid: string;
  displayName?: string | null;
  photoURL?: string | null;
  cover?: string | null; // cover 필드를 optional로 변경
}

export default function Profile() {
  const user = auth.currentUser as FirebaseUser | null;
  const [isLoading, setLoading] = useState(true);
  const [avatar, setAvatar] = useState<string | null>(user?.photoURL || null);
  const [coverImg, setCoverImg] = useState<string | null>(null); // 초기 값은 null로 설정
  const [tweets, setTweets] = useState<ITweet[]>([]);
  const [edit, setEdit] = useState(false);
  const [editName, setEditName] = useState<string>(user?.displayName || "");

  const onAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const storageRef = ref(storage, `avatars/${user?.uid}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    setAvatar(downloadURL);
  };

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditName(e.target.value);
  };

  const onCoverChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const storageRef = ref(storage, `covers/${user?.uid}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    setCoverImg(downloadURL);
  };

  const fetchTweets = async () => {
    const tweetQuery = query(
      collection(db, "tweets"),
      where("userId", "==", user?.uid),
      orderBy("createdAt", "desc"),
      limit(25)
    );

    const snapshot = await getDocs(tweetQuery);
    const tweetsData = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as ITweet[];
    setTweets(tweetsData);
  };

  const fetchUserData = async () => {
    try {
      const userDocRef = user?.uid ? doc(db, "users", user.uid) : null;
      if (!userDocRef) return;
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data() as User; // 프로젝트에서 정의한 User 타입으로 캐스팅
        if (userData && userData.cover) {
          // cover 데이터가 있는지 체크
          setCoverImg(userData.cover); // 데이터가 있을 때만 설정
        }
      }
    } catch (error) {
      console.error("사용자 데이터를 불러오는 중 오류 발생:", error);
    }
  };

  const onEdit = () => {
    setEdit(true);
  };

  const onEditCancel = () => {
    setEdit(false);
    setEditName(user?.displayName || "");
    setAvatar(user?.photoURL || null);
    setCoverImg(null); // 편집 취소 시 초기화
  };

  const onEditSave = async () => {
    try {
      const confirmResult = window.confirm("수정하시겠습니까?");
      if (!confirmResult) return;

      if (user) {
        const updates: Partial<User> = {};
        let isUpdate = false;
        if (editName !== user.displayName) {
          updates.displayName = editName;
          isUpdate = true;
        }
        if (avatar !== user.photoURL) {
          updates.photoURL = avatar;
          isUpdate = true;
        }

        // if (coverImg && coverImg !== user.cover) {
        //   updates.cover = coverImg;
        //   isUpdate = true;
        // }

        if (coverImg) {
          updates.cover = coverImg;
          isUpdate = true;
        }

        if (isUpdate) {
          await updateProfile(auth.currentUser as FirebaseUser, updates);
          const userDocRef = doc(db, "users", user.uid);
          await updateDoc(userDocRef, updates);
          alert("업데이트 되었습니다.");
        } else {
          alert("수정할 내용이 없습니다.");
        }
      }
      setEdit(false);
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  useEffect(() => {
    fetchTweets();
    fetchUserData();
    setLoading(false);
  }, []);

  return (
    <Main className="profile-container">
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <EditContainer>
            <ButtonContainer>
              <EditBtn
                className={edit ? "btn-save" : "btn-edit"}
                onClick={edit ? onEditSave : onEdit}
              >
                {edit ? <HiOutlineCheck /> : <HiOutlineCog />}
              </EditBtn>
              {edit && (
                <EditBtn className="btn-cancel" onClick={onEditCancel}>
                  <HiX />
                </EditBtn>
              )}
            </ButtonContainer>

            {edit ? (
              <UserInfo>
                <CoverWrapper>
                  <CoverUpload htmlFor="coverUpload">
                    {coverImg && <CoverImg src={coverImg} />}
                  </CoverUpload>
                  <CoverInput
                    onChange={onCoverChange}
                    type="file"
                    accept="image/*"
                    id="coverUpload"
                  />
                </CoverWrapper>
                <UserBox>
                  <AvatarWrapper>
                    <AvatarUpload htmlFor="avatarUpload">
                      {avatar ? <AvatarImg src={avatar} /> : <HiUser />}
                    </AvatarUpload>
                    <AvatarInput
                      onChange={onAvatarChange}
                      type="file"
                      accept="image/*"
                      id="avatarUpload"
                    />
                  </AvatarWrapper>
                  <Name>
                    <NameInput
                      type="text"
                      value={editName}
                      onChange={onNameChange}
                    />
                  </Name>
                </UserBox>
              </UserInfo>
            ) : (
              <UserInfo>
                {/* 기본 화면 */}
                <CoverWrapper>
                  {coverImg && <CoverImg src={coverImg} />}
                </CoverWrapper>
                <UserBox>
                  <AvatarWrapper>
                    {avatar ? <AvatarImg src={avatar} /> : <HiUser />}
                  </AvatarWrapper>
                  <Name>{user?.displayName ?? "익명"}</Name>
                </UserBox>
              </UserInfo>
            )}
          </EditContainer>
        </>
      )}

      <Container>
        <Left />
        {tweets.length > 0 ? (
          <Tweets>
            {tweets.map((tweet) => (
              <Tweet key={tweet.id} {...tweet} />
            ))}
          </Tweets>
        ) : (
          <NoData />
        )}
      </Container>
    </Main>
  );
}
