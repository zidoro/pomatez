const activeEnv =
	process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development";

require("dotenv").config({
	path: `.env.${activeEnv}`,
});

module.exports = {
	pathPrefix: "/pomatez",
	siteMetadata: {
		title: `Pomatez | Stay Focused. Take a Break.`,
		description: `Wonderful and helpful app to be more productive while staying healthy.`,
		keywords: [
			"pomatez",
			"tomato app",
			"tomato timer",
			"pomodoro app",
			"pomodoro timer",
			"productivity app",
			"productivity timer",
			"productivity booster",
			"time management app",
		],
		author: `Roldan Montilla Jr`,
		siteUrl: `https://roldanjr.github.io/pomatez`,
		twitterUsername: `@roldan_montilla`,
		googleVerification: `${process.env.GOOGLE_VERIFICATION}`,
	},
	plugins: [
		{
			resolve: `gatsby-plugin-google-analytics`,
			options: {
				trackingId: process.env.GA_TRACKING_ID,
				head: false,
				anonymize: true,
				respectDNT: true,
			},
		},
		`gatsby-plugin-react-helmet`,
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `images`,
				path: `${__dirname}/src/assets/images`,
			},
		},
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `Pomatez`,
				short_name: `Pomatez`,
				start_url: `/`,
				background_color: `#ffffff`,
				theme_color: `#12181b`,
				display: `standalone`,
				icon: `src/assets/images/logo-light.png`, // This path is relative to the root of the site.
			},
		},
		// this (optional) plugin enables Progressive Web App + Offline functionality
		// To learn more, visit: https://gatsby.dev/offline
		`gatsby-plugin-offline`,
		{
			resolve: `gatsby-plugin-styled-components`,
			options: {
				fileName: false,
				pure: true,
			},
		},
		{
			resolve: `gatsby-plugin-react-svg`,
			options: {
				rule: {
					include: /assets/,
				},
			},
		},
		`gatsby-transformer-remark`,
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `contents`,
				path: `${__dirname}/contents`,
			},
		},
	],
};
