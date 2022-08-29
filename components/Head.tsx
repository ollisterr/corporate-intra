/* eslint-disable camelcase */
import React from "react";
import NextHead from "next/head";

export type MetaTags = {
  title: string;
  description: string;
  og_title?: string;
  og_image?: any;
  og_description?: string;
  twitter_title?: string;
  twitter_description?: string;
  twitter_image?: any;
};

const Head = ({
  title = "",
  description = "",
  og_title,
  og_description,
  og_image,
  twitter_title,
  twitter_description,
  twitter_image,
  noIndex = false,
}: MetaTags & { noIndex?: boolean }) => {
  const fullTitle = (x?: string) => `${x || title} – Jäynäkilpailu`;

  return (
    <NextHead>
      <meta charSet="UTF-8" />
      {noIndex && <meta name="robots" content="noindex" />}

      <title>{fullTitle(title)}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <meta name="theme-color" content="#333" />

      <meta property="og:title" content={fullTitle(og_title)} />
      <meta property="og:description" content={og_description || description} />
      <meta property="og:site_name" content="Otaniemen Jäynäkilpailu" />
      <meta
        property="og:image"
        content={og_image?.filename || "/og_image.jpg"}
      />
      <meta property="og:url" content="https://jayna.fi" />

      <meta name="twitter:title" content={fullTitle(twitter_title)} />
      <meta
        name="twitter:description"
        content={twitter_description || description}
      />
      <meta
        name="twitter:image"
        content={twitter_image?.filename || "/og_image.jpg"}
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image:alt" content="Jäynä – Kisa on käynnissä!" />

      <link rel="icon" sizes="180x180" href="/favicon/favicon.svg" />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon.svg"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon.svg"
      />

      <link
        href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;1,800&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap"
        rel="stylesheet"
      />

      <link rel="shortcut icon" href="/favicon/favicon.svg" />

      <script
        src="//app.storyblok.com/f/storyblok-latest.js"
        type="text/javascript"
      />

      <script
        async
        defer
        data-domain="jayna.fi"
        src="https://plausible.io/js/plausible.js"
      />
    </NextHead>
  );
};

export default Head;
