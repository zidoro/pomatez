import { FixedImageProps, FluidImageProps } from "./image";

type FeatureList = {
  heading: string;
  description: string;
};

type BoosterList = {
  heading: string;
  description: string;
  link: string;
  image: FixedImageProps;
};

type StepList = {
  heading: string;
  description: string;
};

type Image = {
  childImageSharp: {
    original: {
      src: string;
      width: number;
      height: number;
    };
  };
};

type CompanyList = {
  name: string;
  logo: FluidImageProps;
};

export type Frontmatter = {
  title: string;
  subTitle?: string;
  betaText?: string;
  mobileText?: string;
  features?: FeatureList[];
  boosters?: BoosterList[];
  stepList?: StepList[];
  headline?: string;
  companies?: CompanyList[];
  image: Image;
};

export type Edges = {
  node: {
    frontmatter: Frontmatter;
    html: string;
  };
};

export type MarkDownProps = {
  allMarkdownRemark: {
    edges: Edges[];
  };
};
