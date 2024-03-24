import styled from "styled-components";
import PostTweetForm from "../components/post-tweet-form";
import Timeline from "../components/timeline";

const Container = styled.div`
  max-width: 1800px;
  width: 100%;
  margin: 0 auto;
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
