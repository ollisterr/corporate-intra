import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { optimizeImage } from "../utils/utils";

interface Props {
  src: string;
  width: number;
  height: number;
  alt?: string;
}

const Image = ({ src, width, height, alt, isVisible }) => {
  const [isReady, setIsReady] = useState(false);
  const [source, setImageSource] = useState<string>();

  const wrapperRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    if (imageRef.current?.complete) setIsReady(true);
  }, [source]);

  // use storyblok image service to fetch optimized image size on render
  useEffect(() => {
    if (wrapperRef.current?.clientWidth) {
      const imgWidth = Math.max(width, wrapperRef.current?.clientWidth);
      setImageSource(optimizeImage(src, imgWidth));
    }
  }, [wrapperRef.current]);

  return (
    <Wrapper ref={wrapperRef} width={width} height={height}>
      <Img
        ref={imageRef}
        src={source}
        alt={alt}
        onLoad={() => setIsReady(true)}
      />
    </Wrapper>
  );
};

const VisibilityWrapper = styled.div`
  width: 100%;
`;

const Wrapper = styled.div<{ width?: number; height?: number }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: ${(p) => (p.width ? `${p.width}px` : "100%")};
  height: ${(p) => (p.height ? `${p.height}px` : "100%")};
  max-width: 100%;
  margin: 0 auto;
`;

const Img = styled.img`
  display: block;
  width: 100%;
  object-position: center center;
`;

export default Image;
