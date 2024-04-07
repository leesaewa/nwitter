import styled from "styled-components";
import PostTweetForm from "../components/post-tweet-form";
import Timeline from "../components/timeline";
import Left from "../components/common/Left";
import { Section } from "../style/GlobalStyles";

export default function Home() {
  return (
    <Section>
      <Timeline />
    </Section>
  );
}
