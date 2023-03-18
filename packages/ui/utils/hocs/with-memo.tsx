import { ComponentType, memo } from "react";

export const withMemo = <P extends {}>(
  Component: ComponentType<P> & { name: string },
  displayName?: string
) => {
  const componentDisplayName = displayName || Component.name;

  const MemoComponent = memo(Component);
  MemoComponent.displayName = componentDisplayName;

  return MemoComponent;
};
