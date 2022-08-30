import NextLink from "next/link";
import styled from "styled-components";
import { AiOutlineCloudDownload } from "react-icons/ai";

export const Attachament = ({ file, title, created_at }) => (
  <NextLink href={file.filename}>
    <Wrapper tabIndex={0}>
      <Content>
        <Caption>{new Date(created_at).toDateString()}</Caption>

        <h3>{title}</h3>
      </Content>

      <AiOutlineCloudDownload style={{ fontSize: "2rem" }} />
    </Wrapper>
  </NextLink>
);

export const Wrapper = styled.span`
  width: 100%;
  padding: 1.5rem 2rem;
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  border: solid 1px lightgray;
  cursor: pointer;

  &:focus {
    outline: solid 2px blue;
  }
  &:hover {
    opacity: 0.8;
  }
`;

export const Caption = styled.p`
  font-size: 0.8rem;
  color: ${(p) => p.theme.colors["grey-dark"]};
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
