import React from "react";
import SbEditable from "storyblok-react";

import { Text } from "../../styles/typography";
import Section from "../Section";
import VideoSection from "../VideoSection";
import Image from "../Image";
import { Column, Row } from "./Layout";
import { Divider } from "../../styles";
import { Disclaimer } from "../Disclaimer";
import Markdown from "../Markdown";
import LinkButton from "../LinkButton";
import { Attachament } from "../Attachment";

const Component = ({ blok }) => {
  switch (blok.component) {
    case "section":
      return <Section {...blok} />;
    case "video-section":
      return <VideoSection {...blok} />;
    case "column":
      return <Column {...blok} />;
    case "row":
      return <Row {...blok} />;
    case "image":
      return <Image {...blok} />;
    case "text-block":
      return <Markdown {...blok} />;
    case "attachment":
      return <Attachament {...blok} />;
    case "disclaimer":
      return <Disclaimer {...blok} />;
    case "link":
      return <LinkButton {...blok} />;
    case "separator":
      return <Divider />;
    case "global_reference":
      // forwards props
      return <Component blok={blok.reference.content} />;
    default:
      return <Text>{JSON.stringify(blok)}</Text>;
  }
};

const ComponentWrapper = ({ blok, ...rest }) => (
  <SbEditable content={blok}>
    <Component blok={{ ...blok, ...rest }} />
  </SbEditable>
);

export default ComponentWrapper;
