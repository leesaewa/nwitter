import styled from "styled-components";
import { ITweet } from "./timeline";

const Wrapper = styled.div`
  border: 1px solid green;
  display: grid;
  grid-template-columns: 1fr 0.5fr;
`;

const Column = styled.div`
  border: 1px solid blue;
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

export default function Tweet({ username, photo, tweet }: ITweet) {
  return (
    <Wrapper>
      <Column>
        <Username>{username}</Username>
        <Payload>{tweet}</Payload>
      </Column>

      {photo ? (
        <Column>
          <Photo src={photo}></Photo>
        </Column>
      ) : null}
    </Wrapper>
  );
}
