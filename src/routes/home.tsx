import styled from "styled-components";
import PostTweetForm from "../components/post-tweet-form";
import Timeline from "../components/timeline";
import Left from "../components/main/Left";
import { Section } from "../style/GlobalStyles";

const Container = styled.main`
  max-width: 1800px;
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 5fr;
  gap: 2rem;
  padding-top: 100px;
`;

export default function Home() {
  return (
    <Container className="main-container">
      <Left />
      <Section>
        {/* <PostTweetForm /> */}
        <Timeline />
      </Section>
    </Container>
  );
}
