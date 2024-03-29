import styled from "styled-components";
import { auth, db, storage } from "../firebase";
import React, { useEffect, useState } from "react";
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

const Container = styled.div``;

const EditContainer = styled.div`
  width: 100%;
  position: relative;
  border: 1px solid red;
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

export default function Profile() {
  const user = auth.currentUser;
  const [isLoading, setLoading] = useState(true);
  const [avatar, setAvatar] = useState(user?.photoURL);
  const [tweets, setTweets] = useState<ITweet[]>([]);
  const [edit, setEdit] = useState(false);
  const [editName, setEditName] = useState(user?.displayName ?? "");

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

  const fetchTweets = async () => {
    const tweetQuery = query(
      collection(db, "tweets"),
      where("userId", "==", user?.uid),
      orderBy("createdAt", "desc"),
      limit(25)
    );
    const snapshot = await getDocs(tweetQuery);
    const tweets = snapshot.docs.map((doc) => {
      const { tweet, createdAt, userId, username, photo } = doc.data();
      return {
        tweet,
        createdAt,
        userId,
        username,
        photo,
        id: doc.id,
      };
    });
    setTweets(tweets);
  };
  const onEdit = () => {
    setEdit(true);
  };
  const onEditCancel = () => {
    setEdit(false);
    setEditName(user?.displayName ?? "");
    setAvatar(user?.photoURL);
  };

  const onEditSave = async () => {
    try {
      const confirmResult = window.confirm("수정하시겠습니까?");
      if (!confirmResult) return;

      if (user) {
        const updates = {};
        let isUpdate = false;
        if (editName !== user.displayName) {
          updates.displayName = editName; // 이름이 변경됐을 때만 저장
          isUpdate = true;
        }
        if (avatar !== user.photoURL) {
          updates.photoURL = avatar;
          isUpdate = true;
        }

        if (isUpdate) {
          await updateProfile(user, updates);
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
    fetchTweets();
    setLoading(false);
  }, []);

  return (
    <Container className="container">
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
                  {avatar ? (
                    <AvatarImg src={avatar} />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </AvatarUpload>
                <AvatarInput
                  onChange={onAvatarChange}
                  type="file"
                  accept="image/*"
                  id="avatarUpload"
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
                {avatar ? (
                  <AvatarImg src={avatar} />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                <Name>{user?.displayName ?? "Anonymous"}</Name>
              </>
            )}
          </EditContainer>

          <Tweets>
            {tweets.map((tweet) => (
              <Tweet key={tweet.id} {...tweet} />
            ))}
          </Tweets>
        </>
      )}
    </Container>
  );
}
