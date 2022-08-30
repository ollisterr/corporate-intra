export const parseHref = (x: string) =>
  x.toLowerCase().replace(/\s/g, "-").replace(/[äå]/g, "a").replace(/ö/g, "o");

export const optimizeImage = (src: string, width: number) => {
  const parsedUrl = src.split("/f/")[1];
  return `https://img2.storyblok.com/${width + 100}x0/smart/f/${parsedUrl}`;
};

export const getElementsWithKey = (
  bloks: Array<{ [key: string]: any }>,
  key: string
) => {
  const links = [];
  for (const blok of bloks) {
    if (blok[key]) {
      links.push(blok);
    }
    if (blok.body) {
      links.push(...getElementsWithKey(blok.body, key));
    }
  }
  return links;
};
