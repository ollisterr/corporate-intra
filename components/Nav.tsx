import React from "react";

import DropdownMenu, { DropdownItemGroup } from "@atlaskit/dropdown-menu";
import { LinkItem } from "@atlaskit/menu";

import {
  AtlassianNavigation,
  PrimaryButton,
} from "@atlaskit/atlassian-navigation";
import Link from "next/link";
import styled from "styled-components";

export type LinkType = {
  name: string;
  storyName: string;
  slug: string;
};

export type NavItem = LinkType & { subPages?: LinkType[] };
export type NavigationTree = NavItem[];

const Nav = ({ navigationTree }: { navigationTree: NavItem[] }) => {
  return (
    <AtlassianNavigation
      label="site"
      primaryItems={navigationTree.map((page) => {
        if (page.subPages) {
          return (
            <Wrapper>
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
            </Wrapper>
          );
        } else {
          return (
            <Wrapper>
              <Link href={page.slug}>
                <PrimaryButton>{page.storyName}</PrimaryButton>
              </Link>
            </Wrapper>
          );
        }
      })}
      // TODO Lisää logo
      renderProductHome={() => null}
    />
  );
};

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  padding-right: 1rem;
`;

export default Nav;
