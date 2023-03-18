import { forwardRef, ForwardRefRenderFunction, memo } from "react";

export const withMemoRef = <T, P = {}>(
  Component: ForwardRefRenderFunction<T, P>,
  displayName?: string
) => {
  const componentDisplayName = displayName || Component.name;

  const RefComponent = forwardRef(Component);
  const MemoComponent = memo(RefComponent);

  MemoComponent.displayName = componentDisplayName;

  return MemoComponent;
};
