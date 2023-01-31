import * as React from "react";
import { PageHead, PageLayout } from "../components";
import { Download, Features, Hero, RoadMap } from "../sections";

function IndexPage() {
  return (
    <PageLayout>
      <Hero />
      <Features />
      <RoadMap />
      <Download />
    </PageLayout>
  );
}

export const Head = PageHead;
export default IndexPage;
