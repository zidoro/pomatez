import { vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen, testA11y } from "@/test-utils";
import Control from "../control";

describe("<Control />", () => {
  test("should pass the a11y test", async () => {
    testA11y(<Control />);
  });

  test("appState - prop should work correctly", () => {
    const { rerender } = render(<Control appState="stayFocused" />);

    expect(screen.getByTestId("stayFocused")).toBeInTheDocument();
    expect(
      screen.getByTestId("stayFocused").getAttribute("class")
    ).toMatch(/appState-stayFocused/i);

    rerender(<Control appState="shortBreak" />);
    expect(screen.getByTestId("shortBreak")).toBeInTheDocument();
    expect(
      screen.getByTestId("shortBreak").getAttribute("class")
    ).toMatch(/appState-shortBreak/i);

    rerender(<Control appState="longBreak" />);
    expect(screen.getByTestId("longBreak")).toBeInTheDocument();
    expect(
      screen.getByTestId("longBreak").getAttribute("class")
    ).toMatch(/appState-longBreak/i);
  });

  test("conditional rendering of controls should work properly", () => {
    const { rerender } = render(
      <Control isRunning={false} isMuted={false} isCompact={false} />
    );

    expect(screen.getByLabelText(/play button/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/disable speaker button/i)
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/enable compact mode button/i)
    ).toBeInTheDocument();

    rerender(
      <Control isRunning={true} isMuted={true} isCompact={true} />
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
        onResetElapsed={onResetCounterFn}
        onResetTimer={onRestartFn}
        onPlayPause={onPlayPauseFn}
        onNextEvent={onNextFn}
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
      screen.getByRole("button", { name: /next event button/i })
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
