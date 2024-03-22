import styled from "styled-components";
import PostTweetForm from "../components/post-tweet-form";
import Timeline from "../components/timeline";

const Container = styled.div`
  width: 100%;
  /* display: grid;
  grid-template-rows: 1fr 5fr;
  gap: 50px;
  overflow-y: scroll; */
`;

export default function Home() {
  return (
    <Container className="container">
      <PostTweetForm />
      <Timeline />
    </Container>
  );
}
