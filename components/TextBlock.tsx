import React from "react";
import styled from "styled-components";
import { Stack } from "styled-layout";

import { Title, Text } from "../styles/typography";
import Divider from "./common/Divider";

const TextBlock = ({ header, content, divider, align }) => {
  return (
    <TextBlockWrapper align={align}>
      <Title>{header}</Title>

      {divider && <Divider />}

      <Text>{content}</Text>
    </TextBlockWrapper>
  );
};

const TextBlockWrapper = styled(Stack)`
  display: flex;
  flex-direction: column;
  max-width: 70ch;
  text-align: ${(p) => p.align};
  transition: color 0.5s;
`;

export default TextBlock;
