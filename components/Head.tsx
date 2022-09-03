/* eslint-disable camelcase */
import React from "react";
import NextHead from "next/head";
import Script from "next/script";

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

  return (
    <NextHead>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {noIndex && <meta name="robots" content="noindex" />}

      <title>{title}</title>
      <meta name="description" content={description} />

      <meta property="og:title" content={og_title} />
      <meta property="og:description" content={og_description || description} />
      <meta property="og:site_name" content="Otaniemen Jäynäkilpailu" />
      <meta
        property="og:image"
        content={og_image?.filename || "/og_banner.jpg"}
      />
      <meta property="og:url" content="https://oksaatio.fun" />

      <meta name="twitter:title" content={twitter_title} />
      <meta
        name="twitter:description"
        content={twitter_description || description}
      />
      <meta
        name="twitter:image"
        content={twitter_image?.filename || "/og_banner.jpg"}
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image:alt" content="Jäynä – Kisa on käynnissä!" />
    </NextHead>
  );
};

export default Head;
