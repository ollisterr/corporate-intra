import { GetStaticProps } from "next";
import React from "react";
import styled from "styled-components";

import Nav from "../components/Nav";
import Layout from "../components/Layout";
import { getPaths } from "../services/storyblok";

const NotFound404 = ({ navigationTree }) => {
  return (
    <Layout
      meta={{ title: "Page not found", description: "No jäynä here" }}
      noIndex
    >
      <Nav navigationTree={navigationTree} />

      <Wrapper>404</Wrapper>
    </Layout>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 90vh;
  font-size: 15rem;
  font-weight: bolder;
  color: ${(p) => p.theme.colors.grey};
  letter-spacing: ${(p) => p.theme.spacing.xlarge};
  text-align: center;

  ${(p) => p.theme.media.mdDown`
    font-size: 8rem;
  `}
`;

export const getStaticProps: GetStaticProps = async ({
  preview = process.env.NODE_ENV === "development",
}) => {
  const paths = await getPaths(
    process.env[preview ? "STORYBLOK_PREVIEW_TOKEN" : "STORYBLOK_API_TOKEN"],
    preview
  );

  return {
    props: { links: paths },
    revalidate: 1600,
  };
};

export default NotFound404;
