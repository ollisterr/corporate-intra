import React from "react";
import SbEditable from "storyblok-react";

import { Text } from "../../styles/typography";
import Image from "../Image";
import { Disclaimer } from "../Disclaimer";
import Markdown from "../Markdown";
import { Attachament } from "../Attachment";

const Component = ({ blok }) => {
  switch (blok.component) {
    case "image":
      return <Image {...blok} />;
    case "text-block":
      return <Markdown {...blok} />;
    case "attachment":
      return <Attachament {...blok} />;
    case "disclaimer":
      return <Disclaimer {...blok} />;
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
