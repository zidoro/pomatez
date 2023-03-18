import { render, screen, testA11y } from "@/test-utils";
import Counter from "../counter";

describe("<Counter />", () => {
  test("should pass the a11y test", async () => {
    testA11y(<Counter />);
  });

  test("appState - prop should work correctly", () => {
    const { rerender } = render(<Counter appState="stayFocused" />);

    const progressElement = screen.getByTestId("progress-svg");
    const timeRemainingElement = screen.getByTestId("time-remaining");

    expect(
      progressElement.getAttribute("class") &&
        timeRemainingElement.getAttribute("class")
    ).toMatch(/appState-stayFocused/i);
    expect(
      screen.getByLabelText(/stay focused icon/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/stay focused/i)).toBeInTheDocument();

    rerender(<Counter appState="shortBreak" />);

    expect(
      progressElement.getAttribute("class") &&
        timeRemainingElement.getAttribute("class")
    ).toMatch(/appState-shortBreak/i);
    expect(
      screen.getByLabelText(/short break icon/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/short break/i)).toBeInTheDocument();

    rerender(<Counter appState="longBreak" />);

    expect(
      progressElement.getAttribute("class") &&
        timeRemainingElement.getAttribute("class")
    ).toMatch(/appState-longBreak/i);
    expect(
      screen.getByLabelText(/long break icon/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/long break/i)).toBeInTheDocument();
  });
});
