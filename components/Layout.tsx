import React from "react";

import Head, { MetaTags } from "./Head";

interface LayoutProps {
  meta: MetaTags;
  noIndex?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, meta, noIndex }) => (
  <>
    <Head {...meta} noIndex={noIndex} />

    <main>{children}</main>
  </>
);

export default Layout;
