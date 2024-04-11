import styled from "styled-components";
import Left from "../components/common/Left";
import Timeline from "../components/timeline";
import { Section } from "../style/GlobalStyles";

export const Main = styled.main`
  max-width: 1800px;
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 340px 5fr;
  gap: 2rem;
  padding-top: 100px;
`;

export default function Home() {
  return (
    <Main className="main-container">
      <Left />
      <Section>
        <Timeline />
      </Section>
    </Main>
  );
}
