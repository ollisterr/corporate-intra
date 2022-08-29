import React, { useState, useEffect } from "react";
import styled from "styled-components";

import theme from "../styles/theme";
import { optimizeImage, parseHref } from "../utils/utils";
import Section from "./Section";

const VideoSection = ({
  video,
  darkener,
  backgroundImage,
  _uid,
  link,
  ...rest
}) => {
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // show video at least 3s after mount (ready or not)
    let timer;
    if (isVideoReady) {
      // delay animation
      timer = setTimeout(() => {
        setIsReady(true);
      }, 1 * 1000);
    } else {
      timer = setTimeout(() => {
        setIsReady(true);
      }, 3 * 1000);
    }

    return () => clearTimeout(timer);
  }, [isVideoReady]);

  return (
    <Wrapper id={link ? parseHref(link) : _uid}>
      <Background
        image={
          backgroundImage?.filename &&
          optimizeImage(backgroundImage.filename, window.innerWidth)
        }
      >
        <Video
          show={isReady}
          onCanPlay={() => setIsVideoReady(true)}
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={video} type="video/webm" />
        </Video>

        <Darkener opacity={darkener} />

        <CoverColor />
      </Background>

      <Section {...rest} color={theme.colors[isReady ? "white" : "black"]} />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  position: relative;
  width: 100vw;
  padding: ${(p) => p.theme.spacing.xxxlarge} ${(p) => p.theme.spacing.default};
  margin-top: ${(p) => p.theme.spacing.xlarge};
  transition: color 0.3s 1s;
`;

const Background = styled.div<{ image: string }>`
  position: absolute;
  top: 0; 
  bottom: 0;
  left: 0; 
  right: 0; 
  z-index: -1;
  background-image: url('${(p) => p.image}');
  background-color: ${(p) => p.theme.colors["grey-dark"]};
  background-size: auto;
  background-position: center center;
  box-shadow: inset 0 -20rem 30rem rgba(0, 0, 0, 0.5);
  overflow: hidden;
`;

const Video = styled.video<{ show: boolean }>`
  width: 100%;
  height: 100%;
  opacity: ${(p) => (p.show ? 1 : 0)};
  transform: opacity 1s;
  object-fit: cover;
`;

const Darkener = styled.div<{ opacity: number }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: ${(p) => p.opacity};
  background-color: #000;
  z-index: 1;
`;

const CoverColor = styled.div`
  position: absolute;
  top: 0;
  bottom: -1px;
  left: 0;
  right: 0;
  background-color: #fff;
  transform-origin: center bottom;
  z-index: 1;
`;

export default VideoSection;
