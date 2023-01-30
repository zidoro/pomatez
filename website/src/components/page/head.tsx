import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { MarkDownProps, SiteMetaProps } from "../../types";
import { URL_PATH_PREFIX } from "../../config";

type QueryProps = SiteMetaProps & MarkDownProps;

export function PageHead() {
  const { site, allMarkdownRemark } =
    useStaticQuery<QueryProps>(graphql`
      query HeaderQuery {
        site {
          siteMetadata {
            title
            description
            siteUrl
            author
            twitterUsername
            googleVerification
          }
        }
        allMarkdownRemark(
          filter: { fileAbsolutePath: { regex: "/hero/" } }
        ) {
          edges {
            node {
              frontmatter {
                image {
                  childImageSharp {
                    original {
                      height
                      src
                      width
                    }
                  }
                }
              }
            }
          }
        }
      }
    `);

  const metaTitle = site.siteMetadata.title;
  const metaDescription = site.siteMetadata.description;
  const metaSiteUrl = site.siteMetadata.siteUrl + URL_PATH_PREFIX;
  const metaImage =
    allMarkdownRemark.edges[0].node.frontmatter.image.childImageSharp
      .original;

  return (
    <>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta
        name="google-site-verification"
        content={site.siteMetadata.googleVerification}
      />

      <meta property="og:type" content="website" />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={metaSiteUrl} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:image" content={metaSiteUrl + metaImage.src} />
      <meta property="og:image:width" content={`${metaImage.width}`} />
      <meta
        property="og:image:height"
        content={`${metaImage.height}`}
      />

      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:creator"
        content={site.siteMetadata.twitterUsername}
      />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin=""
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap"
        rel="stylesheet"
      />
    </>
  );
}
