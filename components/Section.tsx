import React from "react";
import styled from "styled-components";
import { Stack } from "styled-layout";

import Component from "./common/Component";
import { CONTENT_WIDTH } from "../utils/constants";
import { parseHref } from "../utils/utils";

interface SectionProps {
  axis: "x" | "y";
  body: any[];
  _uid: string;
  link: string;
  color: any;
  background_color?: string[];
}

const Section = ({
  axis = "x",
  body,
  color,
  _uid,
  link,
  background_color,
}: Partial<SectionProps>) => {
  const includesLayoutComponent = body.length === 1;

  const sectionContent = body.map((blok: any) => (
    <Component key={blok._uid} blok={blok} />
  ));

  return (
    <Wrapper color={color} backgroundColor={background_color}>
      <SectionWrapper
        axis={{ _: axis, md: axis, sm: "y" }}
        spacing={{ _: "xxxlarge", md: "xlarge", sm: "xxxlarge" }}
        align="center"
        justify="center"
        id={link ? parseHref(link) : _uid}
      >
        {sectionContent}
      </SectionWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.section<{
  color?: string;
  backgroundColor?: string[];
}>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  ${(p) => p.backgroundColor && `padding: ${p.theme.spacing.xxxlarge} 0`};

  color: ${(p) => p.color || p.theme.colors.black};
  background: ${(p) =>
    p.backgroundColor.length
      ? p.backgroundColor.length > 1
        ? `linear-gradient(45deg, ${p.backgroundColor.join(", ")})`
        : p.backgroundColor[0]
      : "transparent"};
`;

const SectionWrapper = styled(Stack)`
  width: 100%;
  max-width: ${CONTENT_WIDTH};
  padding: ${(p) => p.theme.spacing.default};
`;

export default Section;
