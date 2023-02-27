import { vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen, testA11y } from "@/test-utils";
import Control from "../control";

describe("<Control />", () => {
  test("should pass the a11y test", async () => {
    testA11y(<Control />);
  });

  test("appState - prop should work correctly", () => {
    const { rerender } = render(<Control appState="stay-focused" />);

    expect(screen.getByTestId("stay-focused")).toBeInTheDocument();
    expect(
      screen.getByTestId("stay-focused").getAttribute("class")
    ).toMatch(/appState-stay-focused/i);

    rerender(<Control appState="short-break" />);
    expect(screen.getByTestId("short-break")).toBeInTheDocument();
    expect(
      screen.getByTestId("short-break").getAttribute("class")
    ).toMatch(/appState-short-break/i);

    rerender(<Control appState="long-break" />);
    expect(screen.getByTestId("long-break")).toBeInTheDocument();
    expect(
      screen.getByTestId("long-break").getAttribute("class")
    ).toMatch(/appState-long-break/i);

    rerender(<Control appState="special-break" />);
    expect(screen.getByTestId("special-break")).toBeInTheDocument();
    expect(
      screen.getByTestId("special-break").getAttribute("class")
    ).toMatch(/appState-special-break/i);
  });

  test("conditional rendering of controls should work properly", () => {
    const { rerender } = render(
      <Control isPlaying={false} isMuted={false} isCompact={false} />
    );

    expect(screen.getByLabelText(/play button/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/disable speaker button/i)
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/enable compact mode button/i)
    ).toBeInTheDocument();

    rerender(
      <Control isPlaying={true} isMuted={true} isCompact={true} />
    );

    expect(screen.getByLabelText(/pause button/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/enable speaker button/i)
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/disable compact mode button/i)
    ).toBeInTheDocument();
  });

  test("event handlers - props should work correctly", async () => {
    const onResetCounterFn = vi.fn();
    const onRestartFn = vi.fn();
    const onPlayPauseFn = vi.fn();
    const onNextFn = vi.fn();
    const onToggleSoundFn = vi.fn();
    const onToggleCompactFn = vi.fn();

    render(
      <Control
        onResetCounter={onResetCounterFn}
        onRestart={onRestartFn}
        onPlayPause={onPlayPauseFn}
        onNext={onNextFn}
        onToggleSound={onToggleSoundFn}
        onToggleCompact={onToggleCompactFn}
      />
    );

    await userEvent.click(
      screen.getByRole("button", { name: /reset/i })
    );
    await userEvent.click(
      screen.getByRole("button", { name: /restart button/i })
    );
    await userEvent.click(
      screen.getByRole("button", { name: /play button/i })
    );
    await userEvent.click(
      screen.getByRole("button", { name: /next button/i })
    );
    await userEvent.click(
      screen.getByRole("button", { name: /disable speaker button/i })
    );
    await userEvent.click(
      screen.getByRole("button", {
        name: /enable compact mode button/i,
      })
    );

    expect(onResetCounterFn).toBeCalledTimes(1);
    expect(onRestartFn).toBeCalledTimes(1);
    expect(onPlayPauseFn).toBeCalledTimes(1);
    expect(onNextFn).toBeCalledTimes(1);
    expect(onToggleSoundFn).toBeCalledTimes(1);
    expect(onToggleCompactFn).toBeCalledTimes(1);
  });
});
