/* eslint-disable react/display-name */
import React from "react";
import ReactMarkdown from "react-markdown";
import { Stack } from "styled-layout";

import { Text, Title, Subtitle, ListItem } from "../styles/typography";
import Link from "./common/Link";
import Image from "./Image";

const renderers = {
  paragraph: Text,
  heading: ({ children, level }) =>
    level <= 2 ? <Title>{children}</Title> : <Subtitle>{children}</Subtitle>,
  listItem: ListItem,
  link: Link,
  image: Image,
};

const Markdown = ({ content }) => (
  <Stack>
    <ReactMarkdown renderers={renderers}>{content}</ReactMarkdown>
  </Stack>
);

export default Markdown;
