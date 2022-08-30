import { GetStaticProps } from "next";
import { LinkType, NavItem } from "~/components/Nav";
import { getStory, getPaths } from "~/services/storyblok";

export const createNavigationTree = (routes: LinkType[]) =>
  [...routes]
    // root paths first
    .sort((a, b) => a.slug.length - b.slug.length)
    .reduce((acc, curr) => {
      const pathParams = curr.slug.split("/");

      if (pathParams.length === 1) {
        return [...acc, curr];
      } else {
        const accCopy = [...acc];
        const rootIndex = accCopy.findIndex(
          (x) => x.slug.replace("/", "") === pathParams[0]
        );

        if (rootIndex < 0) return [...acc, curr];

        const existing = accCopy[rootIndex];

        existing.subPages = [
          ...(existing.subPages ?? []).filter((x) => x.slug !== curr.slug),
          curr,
        ];

        return accCopy;
      }
    }, [] as NavItem[]);
