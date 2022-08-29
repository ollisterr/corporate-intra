import React from "react";
import NextLink, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

import { BaseText } from "../../styles/typography";

/* Helper component for linking to the same locale by default */

const Link = ({
  children,
  href,
  locale,
  ...rest
}: React.PropsWithChildren<LinkProps>) => {
  const router = useRouter();

  return href.toString().charAt(0) === "#" ? (
    <LinkStyle as="a" href={href as string}>
      {children}
    </LinkStyle>
  ) : (
    <NextLink {...rest} href={href} locale={locale || router.locale}>
      <LinkStyle>{children}</LinkStyle>
    </NextLink>
  );
};

const LinkStyle = styled(BaseText)`
  ${(p) => p.theme.typography.body}
  color: ${(p) => p.theme.colors.seaweed};
  text-decoration: underline;
  cursor: pointer;
`;

export default Link;
