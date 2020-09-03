import { useStaticQuery, graphql } from "gatsby";
import { FluidImageProps, MarkDownProps } from "../types";

export type LandingQueryProps = {
	workTimePreviewLight: FluidImageProps;
	workTimePreviewDark: FluidImageProps;
	shortBreakPreviewLight: FluidImageProps;
	shortBreakPreviewDark: FluidImageProps;
	longBreakPreviewLight: FluidImageProps;
	longBreakPreviewDark: FluidImageProps;
	configPreviewLight: FluidImageProps;
	configPreviewDark: FluidImageProps;
	settingsPreviewLight: FluidImageProps;
	settingsPreviewDark: FluidImageProps;
	tasksPreviewLight: FluidImageProps;
	tasksPreviewDark: FluidImageProps;
} & MarkDownProps;

export const LandingQuery = () =>
	useStaticQuery<LandingQueryProps>(graphql`
		{
			allMarkdownRemark: allMarkdownRemark(
				filter: { fileAbsolutePath: { regex: "/landing/" } }
			) {
				edges {
					node {
						frontmatter {
							title
							subTitle
						}
					}
				}
			}
			workTimePreviewLight: file(relativePath: { eq: "work-time-light.PNG" }) {
				childImageSharp {
					fluid(maxWidth: 250, quality: 90) {
						...GatsbyImageSharpFluid_withWebp
						...GatsbyImageSharpFluidLimitPresentationSize
					}
				}
			}
			workTimePreviewDark: file(relativePath: { eq: "work-time-dark.PNG" }) {
				childImageSharp {
					fluid(maxWidth: 250, quality: 90) {
						...GatsbyImageSharpFluid_withWebp
						...GatsbyImageSharpFluidLimitPresentationSize
					}
				}
			}
			shortBreakPreviewLight: file(
				relativePath: { eq: "short-break-light.PNG" }
			) {
				childImageSharp {
					fluid(maxWidth: 220, quality: 90) {
						...GatsbyImageSharpFluid_withWebp
						...GatsbyImageSharpFluidLimitPresentationSize
					}
				}
			}
			shortBreakPreviewDark: file(
				relativePath: { eq: "short-break-dark.PNG" }
			) {
				childImageSharp {
					fluid(maxWidth: 220, quality: 90) {
						...GatsbyImageSharpFluid_withWebp
						...GatsbyImageSharpFluidLimitPresentationSize
					}
				}
			}
			longBreakPreviewLight: file(
				relativePath: { eq: "long-break-light.PNG" }
			) {
				childImageSharp {
					fluid(maxWidth: 200, quality: 90) {
						...GatsbyImageSharpFluid_withWebp
						...GatsbyImageSharpFluidLimitPresentationSize
					}
				}
			}
			longBreakPreviewDark: file(relativePath: { eq: "long-break-dark.PNG" }) {
				childImageSharp {
					fluid(maxWidth: 200, quality: 90) {
						...GatsbyImageSharpFluid_withWebp
						...GatsbyImageSharpFluidLimitPresentationSize
					}
				}
			}
			configPreviewLight: file(relativePath: { eq: "config-light.PNG" }) {
				childImageSharp {
					fluid(maxWidth: 250, quality: 90) {
						...GatsbyImageSharpFluid_withWebp
						...GatsbyImageSharpFluidLimitPresentationSize
					}
				}
			}
			configPreviewDark: file(relativePath: { eq: "config-dark.PNG" }) {
				childImageSharp {
					fluid(maxWidth: 250, quality: 90) {
						...GatsbyImageSharpFluid_withWebp
						...GatsbyImageSharpFluidLimitPresentationSize
					}
				}
			}
			settingsPreviewLight: file(relativePath: { eq: "settings-light.PNG" }) {
				childImageSharp {
					fluid(maxWidth: 220, quality: 90) {
						...GatsbyImageSharpFluid_withWebp
						...GatsbyImageSharpFluidLimitPresentationSize
					}
				}
			}
			settingsPreviewDark: file(relativePath: { eq: "settings-dark.PNG" }) {
				childImageSharp {
					fluid(maxWidth: 220, quality: 90) {
						...GatsbyImageSharpFluid_withWebp
						...GatsbyImageSharpFluidLimitPresentationSize
					}
				}
			}
			tasksPreviewLight: file(relativePath: { eq: "tasks-light.PNG" }) {
				childImageSharp {
					fluid(maxWidth: 200, quality: 90) {
						...GatsbyImageSharpFluid_withWebp
						...GatsbyImageSharpFluidLimitPresentationSize
					}
				}
			}
			tasksPreviewDark: file(relativePath: { eq: "tasks-dark.PNG" }) {
				childImageSharp {
					fluid(maxWidth: 200, quality: 90) {
						...GatsbyImageSharpFluid_withWebp
						...GatsbyImageSharpFluidLimitPresentationSize
					}
				}
			}
		}
	`);
