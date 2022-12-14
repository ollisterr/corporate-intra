import React, { useEffect } from "react";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Layout from "../components/Layout";

import { getStory, getPaths } from "../services/storyblok";
import Nav, { NavItem } from "../components/Nav";
import Loading from "../components/Loading";
import useStoryblok from "../components/useStoryblok";
import { createNavigationTree } from "~/utils/page.utils";

const DynamicContent = dynamic(() => import("../components/PageContent"), {
  loading: Loading,
});

const Index = ({ story, currentRoute, navigationTree, notFound, preview }) => {
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
    <Layout meta={{ title: "Intra – OK-säätiö", og_title: "Intra – OK-säätiö", description: "Intra OK-säätiön sisäiseen dokumentointiin ja tiedotukseen" }}>
      <Nav navigationTree={navigationTree} />

      {body && (
        <DynamicContent
          currentRoute={currentRoute}
          navigationTree={navigationTree}
          body={body}
        />
      )}
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = process.env.NODE_ENV === "development",
}) => {
  try {
    // join the entire slug
    const rawSlug = (params.page as string[] | undefined)?.join("/");
    const currentSlug = rawSlug || "home"; // fallback root path to "home" page

    console.log(
      `> CURRENT PAGE: /${currentSlug}, context: ${JSON.stringify(
        params
      )}, preview mode: ${preview}`
    );

    // get content for the page
    const story = await getStory(
      process.env[preview ? "STORYBLOK_PREVIEW_TOKEN" : "STORYBLOK_API_TOKEN"],
      currentSlug,
      preview
    );

    // get available page paths for the current locale
    const routes = await getPaths(
      process.env[preview ? "STORYBLOK_PREVIEW_TOKEN" : "STORYBLOK_API_TOKEN"],
      preview
    );

    const navigationTree = createNavigationTree(routes);

    return {
      props: {
        story,
        preview,
        currentRoute: routes.find(
          (route) =>
            route.slug.replace("/", "") === (rawSlug ?? "/").replace("/", "")
        ),
        navigationTree, // for rendering navbar
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
    process.env.STORYBLOK_PREVIEW_TOKEN,
    process.env.NODE_ENV === "development"
  );

  // gerenate NextJS paths of CMS pages
  const paths = pages.map((page) => ({
    params: {
      page: page.slug === "home" ? [""] : page.slug.split("/"),
    },

  }));
  
  console.log("PATHS", paths.map(x => x.params.page.join("/")))


  return {
    paths,
    fallback: false,
  };
};

export default Index;
