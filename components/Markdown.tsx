/* eslint-disable react/display-name */
import React from "react";
import ReactMarkdown, { Components } from "react-markdown";
import { ReactMarkdownOptions } from "react-markdown/lib/react-markdown";
import { Stack } from "styled-layout";

import { Text, Title, Subtitle, ListItem } from "../styles/typography";
import Link from "./common/Link";
import Image from "./Image";

const Heading = ({ children, level }) =>
  level <= 2 ? <Title>{children}</Title> : <Subtitle>{children}</Subtitle>;

const components: Components = {
  p: ({ children }) => <Text>{children}</Text>,
  h1: Heading,
  h2: Heading,
  h3: Heading,
  h4: Heading,
  h5: Heading,
  h6: Heading,
  li: ({ children }) => <ListItem>{children}</ListItem>,
  link: Link,
  img: ({ src, ...rest }) => <Image {...rest} src={{ filename: src }} />,
};

const Markdown = ({ content }) => (
  <Stack>
    <ReactMarkdown components={components}>{content}</ReactMarkdown>
  </Stack>
);

export default Markdown;
