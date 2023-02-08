import { ComponentType } from "react";

export const withDefaults = <P, DP extends Partial<P>>(
  component: ComponentType<P>,
  defaultProps: DP
) => {
  type Props = Partial<DP> & Omit<P, keyof DP>;
  component.defaultProps = defaultProps;

  return component as ComponentType<Props>;
};
