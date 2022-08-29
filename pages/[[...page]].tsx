import React, { useEffect } from "react";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Layout from "../components/Layout";

import { getStory, getPaths } from "../services/storyblok";
import Nav, { LinkType } from "../components/Nav";
import Loading from "../components/Loading";
import useStoryblok from "../components/useStoryblok";
import { parseHref, getElementsWithKey } from "../utils/utils";
import Section from "../components/Section";

const DynamicContent = dynamic(() => import("../components/PageContent"), {
  loading: Loading,
});

const Index = ({ story, links, notFound, preview }) => {
  const router = useRouter();

  const body = useStoryblok(story, preview)?.content.body;

  useEffect(() => {
    if (preview) console.log("Preview mode:", preview);

    if (!router.isFallback && notFound) {
      router.push("/404");
    }
  }, [router.isFallback]);

  if (router.isFallback) {
    return <Loading />;
  }

  return (
    <Layout meta={story.content.meta} noIndex={story.content.hidden}>
      <Nav links={links} />

      <DynamicContent body={body} />

      {/* footer from global references */}
      {story.content.footer?.content && (
        <Section {...story.content.footer.content} />
      )}
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({
  params,
  locale,
  preview = process.env.NODE_ENV === "development",
}) => {
  try {
    // join the entire slug
    const currentSlug: string | undefined =
      (params.page as string[])?.join("/") || "home"; // fallback root path to "home" page

    console.log(
      `> CURRENT PAGE: /${currentSlug}, context: ${JSON.stringify(
        params
      )}, language: ${locale}, preview mode: ${preview}`
    );

    // get content for the page
    const story = await getStory(
      process.env[preview ? "STORYBLOK_PREVIEW_TOKEN" : "STORYBLOK_API_TOKEN"],
      currentSlug,
      preview
    );

    // get available page paths for the current locale
    const paths = await getPaths(
      process.env[preview ? "STORYBLOK_PREVIEW_TOKEN" : "STORYBLOK_API_TOKEN"],
      preview
    );

    return {
      props: {
        story,
        preview,
        links: paths, // for rendering navbar
      },
      revalidate: 60, // one minute
    };
  } catch (err) {
    // Redirects and renders to 404
    return { props: { body: null, notFound: true } };
  }
};

export const getStaticPaths = async () => {
  // get all page paths
  const pages = await getPaths(
    process.env.STORYBLOK_API_TOKEN,
    process.env.NODE_ENV === "development"
  );

  // gerenate NextJS paths of CMS pages
  const paths = pages.map((page) => ({
    params: {
      page: page.slug === "home" ? [""] : page.slug.split("/"),
    },
  }));

  console.log(JSON.stringify(paths));

  return {
    paths,
    fallback: false,
  };
};

export default Index;
