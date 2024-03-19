import styled from "styled-components";
import { ITweet } from "./timeline";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

const Wrapper = styled.div`
  border: 1px solid green;
  display: grid;
  grid-template-columns: 1fr 0.2fr;
`;

const Column = styled.div`
  border: 1px solid blue;
  position: relative;
`;

const Username = styled.span`
  display: block;
  font-size: 20px;
  font-weight: 600;
  padding-bottom: 8px;
  margin-bottom: 8px;
  border-bottom: 1px dashed aliceblue;
`;

const Payload = styled.p`
  padding-top: 5px;
`;

const Photo = styled.img`
  width: 100%;
`;

const DeleteBtn = styled.button`
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 0;
  background-color: maroon;
  border-radius: 5px;
  border: 1px solid transparent;
  color: white;
  font-size: 14px;
  padding: 4px 10px;

  &:hover {
    background-color: aliceblue;
    color: maroon;
  }
`;

export default function Tweet({ username, photo, tweet, userId, id }: ITweet) {
  const user = auth.currentUser;

  const onDelete = async () => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this tweet?"
    );
    if (!confirmDelete || user?.uid !== userId) return;
    try {
      await deleteDoc(doc(db, "tweets", id));
      if (photo) {
        const photoRef = ref(storage, `tweets/${user.uid}/${id}`);
        await deleteObject(photoRef);
      }
    } catch (e) {
      console.log(e);
    } finally {
      //
    }
  };

  return (
    <Wrapper>
      <Column>
        <Username>{username}</Username>
        <Payload>{tweet}</Payload>
        {user?.uid === userId ? (
          <DeleteBtn onClick={onDelete}>Delete</DeleteBtn>
        ) : null}
      </Column>

      <Column>{photo ? <Photo src={photo}></Photo> : null}</Column>
    </Wrapper>
  );
}
