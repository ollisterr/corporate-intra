import StoryblokClient, { StoryParams } from "storyblok-js-client";
import { LinkType } from "../components/Nav";

const StoryblokService = new StoryblokClient({
  cache: {
    clear: "auto",
    type: "memory",
  },
});

export default StoryblokService;

export const getSpace = async (token) => {
  const { data } = await StoryblokService.get("cdn/spaces/me/", { token });
  return data.space;
};

export const getStories = async (token, preview = false) => {
  const { data } = await StoryblokService.getStories({
    token,
    version: preview ? "draft" : "published",
  });
  return data.stories;
};

export type Paths = LinkType[];

export const getPaths = async (token, preview = false): Promise<Paths> => {
  const stories = await getStories(token, preview);

  return (
    stories
      // include only page components
      .filter((story) => story.content.component === "page")
      .map((story) => ({
        name: story.name,
        storyName: story.name,
        slug: story.full_slug,
      }))
  );
};

export const getStory = async (token, slug = "etusivu", preview) => {
  const params = {
    version: preview ? "draft" : "published",
    token,
    resolve_links: "url",
    resolve_relations: "global_reference.reference,page.footer",
  } as StoryParams;
  const { data } = await StoryblokService.getStory(
    slug?.length ? slug : "home",
    params
  );

  return data.story;
};
