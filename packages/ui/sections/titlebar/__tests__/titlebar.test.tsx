import { vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen, testA11y } from "@/test-utils";
import Titlebar from "../titlebar";

describe("<Titlebar />", () => {
  test("should pass the a11y test", async () => {
    await testA11y(<Titlebar />);
  });

  test("should be able to trigger window actions", async () => {
    const onMinimizeFn = vi.fn();
    const onCloseFn = vi.fn();

    render(<Titlebar onMinimize={onMinimizeFn} onClose={onCloseFn} />);

    await userEvent.click(screen.getByLabelText(/minimize button/i));
    await userEvent.click(screen.getByLabelText(/close button/i));

    expect(onMinimizeFn).toBeCalledTimes(1);
    expect(onCloseFn).toBeCalledTimes(1);
  });
});
