import React from "react";
import styled, { keyframes } from "styled-components";

import LoadingIcon from "./common/LoadingIcon";

const Loading = () => (
  <Wrapper>
    <Bottom>
      <LoadingIcon />
    </Bottom>

    <Overlay>
      <LoadingIcon />
    </Overlay>
  </Wrapper>
);

const Wrapper = styled.div`
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  align-items: center;
  justify-content: center;
`;

const Icon = styled.div`
  position: absolute;
  width: 5rem;
  height: 5rem;
`;

const clipAnimation = keyframes`
  0% {
    clip-path: polygon(0% 0%, 0% 0%, 0% 105%, 0% 105%);
  }

  50% {
    clip-path: polygon(0% 0%, 100% 0%, 100% 105%, 0% 105%);
  }

  100% {
    clip-path: polygon(100% 0%, 100% 0%, 100% 105%, 100% 105%);
  }
`;

const Overlay = styled(Icon)`
  color: ${(p) => p.theme.colors.seaweed};
  animation: ${clipAnimation} 1.5s cubic-bezier(0.71, 0.01, 0.48, 0.99) infinite;
`;

const Bottom = styled(Icon)`
  color: ${(p) => p.theme.colors.peach};
`;

export default Loading;
