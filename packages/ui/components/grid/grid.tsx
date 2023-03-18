import {
  ForwardRefExoticComponent,
  MemoExoticComponent,
  PropsWithoutRef,
  RefAttributes,
} from "react";
import GridContainer, { GridContainerProps } from "./grid-container";
import GridItem from "./grid-item";

export type GridProps = GridContainerProps;

type GridComponent<T, P = {}> = MemoExoticComponent<
  ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>>
> & {
  Item: typeof GridItem;
};

const Grid = GridContainer as GridComponent<HTMLDivElement, GridProps>;

Grid.Item = GridItem;

export default Grid;
