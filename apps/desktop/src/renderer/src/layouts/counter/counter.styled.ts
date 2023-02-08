import { styled } from "@pomatez/ui";
import { ProgressSVG } from "@renderer/components";

export const StyledCounter = styled("div", {
  position: "relative",
  width: "100%",
  flex: "1 1",
  padding: "2rem",
  backgroundColor: "$bgPrimary",

  "&::before": {
    content: "''",
    borderRadius: "50%",
    border: "0.6rem solid $bgSecondary",
  },

  "&::before, #progress-svg": {
    position: "absolute",
    width: "22rem",
    height: "22rem",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%) rotateY(-180deg) rotateZ(-90deg)",
  },
});

export const StyledCounterProgress = styled(ProgressSVG, {
  stroke: "$primary",
  strokeWidth: "0.6rem",
  strokeLinecap: "round",
  strokeDasharray: "67.4rem",
  strokeDashoffset: 0,
});

export const StyledCounterWrapper = styled("div", {
  width: "100%",
  height: "100%",

  position: "absolute",
  top: 0,
  left: 0,

  display: "grid",
  alignContent: "center",
  justifyContent: "center",
  justifyItems: "center",

  marginTop: "-0.8rem",
});

export const StyledCounterIcon = styled("div", {
  color: "$bodyText",
  textAlign: "center",

  "& > svg": {
    width: "4rem",
    height: "4rem",
    fill: "currentColor",
  },
});

export const StyledCounterTimer = styled("p", {
  fontSize: "4rem",
  fontWeight: 400,
  lineHeight: "1.2",

  color: "$primary",

  width: "20rem",

  display: "grid",
  alignItems: "center",
  justifyItems: "start",
  gridTemplateColumns: "1fr max-content 1fr",
  columnGap: "0.8rem",

  "& > span:first-of-type": {
    justifySelf: "end",
  },
});

export const StyledCounterType = styled("p", {
  fontSize: "1.8rem",
  textTransform: "capitalize",
});
