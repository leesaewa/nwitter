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

const Wrapper = styled.div``;

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

const ButtonWrapper = styled.div`
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
  const [avatar, setAvatar] = useState(user?.photoURL);
  const [tweets, setTweets] = useState<ITweet[]>([]);
  const [edit, setEdit] = useState(false);
  const [editName, setEditName] = useState(user?.displayName ?? "");

  const onAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!user) return;
    if (files && files.length === 1) {
      const file = files[0];
      const locationRef = ref(storage, `avatars/${user.uid}`);
      const result = await uploadBytes(locationRef, file);
      const avatarUrl = await getDownloadURL(result.ref);
      setAvatar(avatarUrl);
      await updateProfile(user, { photoURL: avatarUrl });
    }
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
  };
  const onEditSave = async () => {
    confirm("수정하시겠습니까?");
    if (user) {
      await updateProfile(user, { displayName: editName });
      alert("수정했습니다.");
      setEdit(false);
    }
  };
  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditName(e.target.value);
  };

  useEffect(() => {
    fetchTweets();
  }, []);

  return (
    <Wrapper>
      <EditContainer>
        <ButtonWrapper>
          {edit ? (
            <>
              <EditBtn className="btn-save" onClick={onEditSave}>
                Save
              </EditBtn>
              <EditBtn className="btn-cancel" onClick={onEditCancel}>
                Cancel
              </EditBtn>
            </>
          ) : (
            <EditBtn onClick={onEdit}>Edit</EditBtn>
          )}
        </ButtonWrapper>

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
              <NameInput type="text" value={editName} onChange={onNameChange} />
            </Name>
          </>
        ) : (
          <>
            <AvatarImg src={avatar} />
            <Name>{user?.displayName ?? "Anonymous"}</Name>
          </>
        )}
      </EditContainer>

      <Tweets>
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} {...tweet} />
        ))}
      </Tweets>
    </Wrapper>
  );
}
