import React, { useEffect, useState, useRef, useMemo } from "react";
import styled from "styled-components";
import { Stack } from "styled-layout";
import { useRouter } from "next/router";

import { Button } from "../styles";
import { media } from "../styles/theme";

import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from "@atlaskit/dropdown-menu";
import { ButtonItem, LinkItem } from "@atlaskit/menu";

import {
  AtlassianNavigation,
  PrimaryButton,
  PrimaryDropdownButton,
} from "@atlaskit/atlassian-navigation";
import Link from "next/link";

export type LinkType = {
  name: string;
  storyName: string;
  slug: string;
};

type NavItem = LinkType & { subPages?: LinkType[] };

const Nav = ({ links }: { links: LinkType[] }) => {
  const groupedPages: Array<NavItem> = useMemo(() => {
    const linksCopy = [...links];
    return (
      linksCopy
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
        }, [] as NavItem[])
    );
  }, [links]);

  return (
    <AtlassianNavigation
      label="site"
      primaryItems={groupedPages.map((page) => {
        if (page.subPages) {
          return (
            <DropdownMenu trigger={page.storyName}>
              <DropdownItemGroup>
                <Link key={page.slug} href={page.slug}>
                  <LinkItem>{page.name}</LinkItem>
                </Link>

                {page.subPages.map((page) => (
                  <Link key={page.slug} href={page.slug}>
                    <LinkItem>{page.name}</LinkItem>
                  </Link>
                ))}
              </DropdownItemGroup>
            </DropdownMenu>
          );
        } else {
          return (
            <Link href={page.slug}>
              <PrimaryButton>{page.storyName}</PrimaryButton>
            </Link>
          );
        }
      })}
      // TODO Lisää logo
      renderProductHome={() => null}
    />
  );
};

export default Nav;
