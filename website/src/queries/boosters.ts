import { useStaticQuery, graphql } from "gatsby";
import { MarkDownProps } from "../types";

export const BoosterQuery = () =>
  useStaticQuery<MarkDownProps>(graphql`
    {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/boosters/" } }
      ) {
        edges {
          node {
            frontmatter {
              title
              subTitle
              boosters {
                heading
                description
                link
                image {
                  childImageSharp {
                    fixed(width: 280, height: 280) {
                      ...GatsbyImageSharpFixed_withWebp
                    }
                  }
                }
              }
              headline
              companies {
                name
                logo {
                  childImageSharp {
                    fluid(maxWidth: 225, quality: 90) {
                      ...GatsbyImageSharpFluid_withWebp_tracedSVG
                      ...GatsbyImageSharpFluidLimitPresentationSize
                    }
                  }
                }
              }
            }
            html
          }
        }
      }
    }
  `);
