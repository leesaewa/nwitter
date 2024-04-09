import React, { useEffect, useState } from "react";
import styled from "styled-components";
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
import { updateProfile } from "firebase/auth";
import { ITweet } from "../components/timeline";
import Tweet from "../components/tweet";
import LoadingScreen from "../components/loading-screen";
import { HiUser } from "react-icons/hi2";
import Left from "../components/common/Left";

const Main = styled.main``;

const Container = styled.div`
  max-width: 1800px;
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 5fr;
  gap: 2rem;
  padding-top: 100px;
`;

const EditContainer = styled.div`
  width: 100%;
  position: relative;
  padding-top: 100px;
  border: 1px solid maroon;
  border-radius: 0.75rem;
  overflow: hidden;
`;

const AvatarUpload = styled.label`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: maroon;
  overflow: hidden;
`;
const AvatarImg = styled.img`
  width: 100px;
  height: 100px;
`;
const AvatarInput = styled.input`
  display: none;
`;

const Name = styled.span``;
const NameInput = styled.input``;

const Tweets = styled.div``;

const ButtonContainer = styled.div`
  position: absolute;
  right: 0;
  top: 0;
`;

const Button = styled.button`
  cursor: pointer;
  border-radius: 5px;
  border: 1px solid transparent;
  font-size: 14px;
  padding: 4px 10px;
  &:hover {
    background-color: aliceblue;
  }
`;

const EditBtn = styled(Button)`
  background-color: cadetblue;
  &.btn-save {
    background-color: cornflowerblue;
  }
  &.btn-cancel {
    background-color: cornsilk;
  }
`;

const CoverUpload = styled.label``;
const CoverInput = styled.input``;
const CoverImg = styled.img`
  border: 1px solid blue;
  width: 100%;
  height: 200px;
`;

export default function Profile() {
  const user = auth.currentUser;
  const [isLoading, setLoading] = useState(true);
  const [avatar, setAvatar] = useState(user?.photoURL);
  const [coverImg, setCoverImg] = useState(user?.cover || "");
  const [tweets, setTweets] = useState<ITweet[]>([]);
  const [edit, setEdit] = useState(false);
  const [editName, setEditName] = useState(user?.displayName || "");

  const onAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
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
    const file = e.target.files[0];
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
    }));
    setTweets(tweetsData);
  };
  const onEdit = () => {
    setEdit(true);
  };
  const onEditCancel = () => {
    setEdit(false);
    setEditName(user?.displayName ?? "");
    setAvatar(user?.photoURL);
    setCoverImg(coverImg || "/logo.png");
  };

  const onEditSave = async () => {
    try {
      const confirmResult = window.confirm("수정하시겠습니까?");
      if (!confirmResult) return;

      if (user) {
        const updates = {};
        let isUpdate = false;
        if (editName !== user.displayName) {
          updates.displayName = editName;
          isUpdate = true;
        }
        if (avatar !== user.photoURL) {
          updates.photoURL = avatar;
          isUpdate = true;
        }

        if (coverImg !== user.cover) {
          updates.cover = coverImg;
          isUpdate = true;
        }

        if (isUpdate) {
          await updateProfile(user, updates);
          const userDocRef = doc(db, "users", user.uid);
          await updateDoc(userDocRef, updates);
          // await updateDoc(userDocRef, { cover: coverImg });

          alert("업데이트 되었습니다.");
        } else {
          alert("수정할 내용이 없습니다.");
        }
      }
      setEdit(false);
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDocRef = doc(db, "users", user?.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          if (userData) {
            setCoverImg(userData.cover || "");
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchTweets();
    fetchUserData();
    setLoading(false);
  }, []);

  return (
    <Main>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <EditContainer>
            <ButtonContainer>
              <EditBtn
                className="btn-save"
                onClick={edit ? onEditSave : onEdit}
              >
                {edit ? "Save" : "Edit"}
              </EditBtn>
              {edit && (
                <EditBtn className="btn-cancel" onClick={onEditCancel}>
                  Cancel
                </EditBtn>
              )}
            </ButtonContainer>

            {edit ? (
              <>
                <AvatarUpload htmlFor="avatarUpload">
                  {avatar ? <AvatarImg src={avatar} /> : <HiUser />}
                </AvatarUpload>
                <AvatarInput
                  onChange={onAvatarChange}
                  type="file"
                  accept="image/*"
                  id="avatarUpload"
                />

                <CoverUpload htmlFor="coverUpload">
                  커버업로드
                  {coverImg ? <CoverImg src={coverImg} /> : <span>커버!!</span>}
                </CoverUpload>
                <CoverInput
                  onChange={onCoverChange}
                  type="file"
                  accept="image/*"
                  id="coverUpload"
                />
                <Name>
                  <NameInput
                    type="text"
                    value={editName}
                    onChange={onNameChange}
                  />
                </Name>
              </>
            ) : (
              <>
                {/* 기본 화면 */}
                {coverImg ? (
                  <CoverImg src={coverImg} />
                ) : (
                  <CoverImg src="/logo.png" />
                )}
                {avatar ? <AvatarImg src={avatar} /> : <HiUser />}
                <Name>{user?.displayName ?? "Anonymous"}</Name>
              </>
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
          <span>not yet!</span>
        )}
      </Container>
    </Main>
  );
}
