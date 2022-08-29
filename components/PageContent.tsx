import React from "react";
import { Stack } from "styled-layout";
import styled from "styled-components";

import Component from "./common/Component";

const PageContent = ({ body }) => (
  <PageWrapper spacing="none" align="center">
    {body.map((blok) => (
      <Component key={blok._uid} blok={blok} />
    ))}
  </PageWrapper>
);

const PageWrapper = styled(Stack)`
  padding-top: 1.5rem;
  overflow: hidden;
`;

export default PageContent;
