import type { GatsbyConfig } from "gatsby";
import { ENV, URL_PATH_PREFIX } from "./src/config";

const config: GatsbyConfig = {
  pathPrefix: URL_PATH_PREFIX,
  siteMetadata: {
    title: "Pomatez | Stay Focused. Take a Break.",
    description:
      "Elegant Multi-platform Desktop App for Pomodoro Lovers.",
    author: "Roldan Montilla Jr",
    siteUrl: `https://roldanjr.github.io`,
    twitterUsername: "@roldanjr_dev",
    googleVerification: ENV.GOOGLE_VERIFICATION,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          ENV.GA_TRACKING_ID, // Google Analytics / GA
        ],
        // This object gets passed directly to the gtag config command
        // This config will be shared across all trackingIds
        gtagConfig: {
          anonymize_ip: true,
        },
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: false,
          // Setting this parameter is also optional
          respectDNT: true,
          // Avoids sending pageview hits from custom paths
          exclude: [],
          // Delays processing pageview events on route update (in milliseconds)
          delayOnRouteUpdate: 0,
        },
      },
    },
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        fileName: false,
        pure: true,
      },
    },
    "gatsby-plugin-image", // TODO: Migrate `gatsby-image` to `gatsby-plugin-image`
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "./assets/images/logo-light.png",
      },
    },
    "gatsby-transformer-remark",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./assets/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "content",
        path: "./content",
      },
      __key: "content",
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /assets/,
        },
      },
    },
  ],
};

export default config;
