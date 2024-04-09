import styled from "styled-components";

const NoPost = styled.div`
  text-align: center;

  p {
    font-size: 2rem;
    color: maroon;
    line-height: 1.4em;
  }

  img {
    margin-top: 2rem;
    border-radius: 1rem;
  }
`;

export default function NoData() {
  return (
    <NoPost className="eng">
      <p>You don't have any articles posted yet.</p>
      <p>Let's post something mysterious in the Daily Prophet's News.</p>
      <img src="/no-data.webp" />
    </NoPost>
  );
}
