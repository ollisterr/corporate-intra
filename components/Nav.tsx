import React from "react";

import DropdownMenu, { DropdownItemGroup } from "@atlaskit/dropdown-menu";
import { ButtonItem } from "@atlaskit/menu";

import {
  AtlassianNavigation,
  PrimaryButton,
} from "@atlaskit/atlassian-navigation";
import { Link } from "./common";
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
    <Container>
    <AtlassianNavigation
      label="site"
      primaryItems={navigationTree.map((page) => {
        if (page.subPages.length) {
          return (
            <Wrapper>
              <DropdownMenu trigger={page.storyName}>
                <DropdownItemGroup>
                  <Link key={page.slug} href={page.slug}>
                    <ButtonItem>{page.name}</ButtonItem>
                  </Link>

                  {page.subPages.map((page) => (
                    <Link key={page.slug} href={page.slug}>
                      <ButtonItem>{page.name}</ButtonItem>
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
    </Container>
  );
};

const Container = styled.div`
  max-width: 100vw;
`

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

export default Nav;
