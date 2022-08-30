import React from "react";
import { Stack } from "styled-layout";
import styled from "styled-components";

import Component from "./common/Component";
import { LinkType, NavigationTree } from "./Nav";
import { useRouter } from "next/router";

import Breadcrumbs, { BreadcrumbsItem } from "@atlaskit/breadcrumbs";
import PageHeader from "@atlaskit/page-header";
import Link from "next/link";
import { Content, Main, PageLayout } from "@atlaskit/page-layout";

interface Props {
  body: any;
  navigationTree: NavigationTree;
  currentRoute: LinkType;
}

const getCurrentRoute = (
  currentSlug: string,
  tree: NavigationTree
): LinkType | null => {
  return tree.reduce((acc, curr, i, arr) => {
    if (acc) {
      arr.splice(1);
      return acc;
    } else if (curr.slug === currentSlug) {
      return curr;
    } else if (curr.subPages) {
      return getCurrentRoute(currentSlug, curr.subPages);
    } else {
      return null;
    }
  }, null);
};

const PageContent = ({ body, currentRoute, navigationTree }: Props) => {
  const rootPath = currentRoute.slug.split("/")[0];
  const rootPage = navigationTree.find(
    (x) => x.slug.replace("/", "") === rootPath
  );

  if (!currentRoute) return null;

  const breadcrumbs = (
    <Breadcrumbs onExpand={() => undefined}>
      {rootPage && rootPage.slug !== currentRoute.slug && (
        <Link href={rootPage.slug}>
          <BreadcrumbsItem text={rootPage.storyName} key={rootPage.slug} />
        </Link>
      )}

      {rootPage && rootPage.slug !== currentRoute.slug && (
        <Link href={currentRoute.slug}>
          <BreadcrumbsItem
            text={currentRoute.storyName}
            key={currentRoute.slug}
          />
        </Link>
      )}
    </Breadcrumbs>
  );

  return (
    <PageLayout>
      <Content testId="content">
        <Main testId="main" id="main" skipLinkTitle="Main Content">
          <Container spacing="medium">
            <PageHeader breadcrumbs={breadcrumbs}>
              {currentRoute.storyName}
            </PageHeader>

            {body.map((blok) => (
              <Component key={blok._uid} blok={blok} />
            ))}
          </Container>
        </Main>
      </Content>
    </PageLayout>
  );
};

const Container = styled(Stack)`
  padding: 1rem;
  margin: 0 auto;
  max-width: 800px;
  overflow: hidden;
`;

export default PageContent;
