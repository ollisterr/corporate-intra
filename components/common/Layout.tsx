import React from "react";
import { Stack } from "styled-layout";

import Component from "./Component";
import { Title } from "../../styles/typography";

export const Column = ({ header, body, align }) => (
  <Stack align={align} spacing="xxlarge">
    {!!header && <Title>{header}</Title>}

    {body.map((blok) => (
      <Component key={blok._uid} blok={blok} />
    ))}
  </Stack>
);

export const Row = ({ body }) => (
  <Stack
    axis={{ _: "x", sm: "y" }}
    spacing="xxxlarge"
    align="center"
    justify="center"
  >
    {body.map((blok) => (
      <Component key={blok._uid} blok={blok} />
    ))}
  </Stack>
);
