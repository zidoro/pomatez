import { render, screen, testA11y } from "@/test-utils";
import Counter from "../counter";

describe("<Counter />", () => {
  test("should pass the a11y test", async () => {
    testA11y(<Counter />);
  });

  test("appState - prop should work correctly", () => {
    const { rerender } = render(<Counter appState="stay-focused" />);

    const progressElement = screen.getByTestId("progress-svg");
    const timeRemainingElement = screen.getByTestId("time-remaining");

    expect(
      progressElement.getAttribute("class") &&
        timeRemainingElement.getAttribute("class")
    ).toMatch(/appState-stay-focused/i);
    expect(
      screen.getByLabelText(/stay focused icon/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/stay focused/i)).toBeInTheDocument();

    rerender(<Counter appState="short-break" />);

    expect(
      progressElement.getAttribute("class") &&
        timeRemainingElement.getAttribute("class")
    ).toMatch(/appState-short-break/i);
    expect(
      screen.getByLabelText(/short break icon/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/short break/i)).toBeInTheDocument();

    rerender(<Counter appState="long-break" />);

    expect(
      progressElement.getAttribute("class") &&
        timeRemainingElement.getAttribute("class")
    ).toMatch(/appState-long-break/i);
    expect(
      screen.getByLabelText(/long break icon/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/long break/i)).toBeInTheDocument();

    rerender(<Counter appState="special-break" />);

    expect(
      progressElement.getAttribute("class") &&
        timeRemainingElement.getAttribute("class")
    ).toMatch(/appState-special-break/i);
    expect(
      screen.getByLabelText(/special break icon/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/special break/i)).toBeInTheDocument();
  });
});
