import { FixedObject, FluidObject } from "gatsby-image";

export type FixedImageProps = {
  childImageSharp: {
    fixed: FixedObject | FixedObject[];
  };
};

export type FluidImageProps = {
  childImageSharp: {
    fluid: FluidObject | FluidObject[];
  };
};

type EdgesProps = {
  node: {
    resize: {
      src: string;
    };
  };
};

export type AllImageSharpProps = {
  allImageSharp: {
    edges: EdgesProps[];
  };
};
