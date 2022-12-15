import { useStaticQuery, graphql } from "gatsby";
import { MarkDownProps } from "../types";

export const DownloadQuery = () =>
  useStaticQuery<MarkDownProps>(graphql`
    {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/download/" } }
      ) {
        edges {
          node {
            frontmatter {
              title
              subTitle
            }
            html
          }
        }
      }
    }
  `);
