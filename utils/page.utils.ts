import { LinkType, NavItem } from "~/components/Nav";

export const createNavigationTree = (routes: LinkType[]) =>
  [...routes]
    // root paths first
    .sort((a, b) => a.slug.length - b.slug.length)
    .reduce<NavItem[]>((acc, curr) => {
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
    }, [] as NavItem[])
    .map((page) => {
      const clone = [...(page.subPages ?? [])];
      return {
        ...page,
        subPages: clone.sort((a, b) => (a.storyName < b.storyName ? -1 : 1)),
      };
    });
