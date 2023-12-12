import React, { useState, useCallback, useEffect } from "react";
import {
  StyledSpecialField,
  StyledSpecialClearButton,
  StyledSpecialBreakSetter,
  StyledDetailCloseButton,
  StyledSpecialBreakSetterSection,
  StyledSpecialBreakDuration,
  StyledSpecialBreakAction,
  StyledButtonNormal,
  StyledSpecialBreakDurationSpan,
} from "styles";
import { Time, SVG } from "components";
import { parseTime } from "utils";

type SpecialFieldProps = {
  fromTime: string;
  toTime: string;
  duration: number;
};

type Props = {
  onFieldSubmit?: (values: SpecialFieldProps) => void;
} & React.HTMLProps<HTMLInputElement> &
  SpecialFieldProps;

const SpecialField: React.FC<Props> = ({
  fromTime,
  toTime,
  duration,
  disabled,
  onFieldSubmit,
}) => {
  const [showSetter, setShowSetter] = useState(false);

  const [values, setValues] = useState({
    fromTime,
    toTime,
    duration,
  });

  const [success, setSuccess] = useState(false);

  const [errors, setErrors] = useState({
    fromTime: false,
    toTime: false,
    duration: false,
  });

  const getValues = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setValues((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    []
  );

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!values.toTime) {
        setErrors((prevState) => ({
          ...prevState,
          toTime: true,
        }));
      } else {
        setErrors((prevState) => ({
          ...prevState,
          toTime: false,
        }));
      }

      if (!values.fromTime) {
        setErrors((prevState) => ({
          ...prevState,
          fromTime: true,
        }));
      } else {
        setErrors((prevState) => ({
          ...prevState,
          fromTime: false,
        }));
      }

      if (
        values.fromTime &&
        values.toTime &&
        values.duration >= 5 &&
        onFieldSubmit
      ) {
        setShowSetter(false);
        setSuccess(true);
        onFieldSubmit(values);

        setTimeout(() => setSuccess(false), 2000);
      }
    },
    [onFieldSubmit, values]
  );

  const onClear = useCallback(
    (e) => {
      e.stopPropagation();
      const newValues = {
        fromTime: "",
        toTime: "",
        duration: 0,
      };
      if (onFieldSubmit && !disabled) {
        setSuccess(true);
        setValues(newValues);
        onFieldSubmit(newValues);

        setTimeout(() => setSuccess(false), 2000);
      }
    },
    [onFieldSubmit, disabled]
  );

  useEffect(() => {
    if (values.fromTime && values.toTime) {
      const duration =
        parseTime(values.toTime) - parseTime(values.fromTime);

      setErrors({
        fromTime: false,
        toTime: false,
        duration: duration < 5 ? true : false,
      });
      setValues((prevState) => ({
        ...prevState,
        duration,
      }));
    }
  }, [values.fromTime, values.toTime]);

  useEffect(() => {
    function registerEscape(e: KeyboardEvent) {
      if (e.code === "Escape") {
        setShowSetter(false);
      }
    }

    document.addEventListener("keydown", registerEscape);
    return () =>
      document.removeEventListener("keydown", registerEscape);
  }, []);

  return (
    <>
      <StyledSpecialField
        tabIndex={0}
        success={success}
        disabled={disabled}
        onClick={() => {
          if (!disabled) {
            setShowSetter(true);
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setShowSetter(true);
          }
        }}
      >
        <input type="time" value={fromTime} disabled />
        <span />
        <input
          type="number"
          value={duration === 0 ? "" : duration}
          placeholder="min"
          disabled
        />
        <StyledSpecialClearButton
          type="button"
          tabIndex={-1}
          success={success}
          onClick={onClear}
        >
          <SVG name="close" />
        </StyledSpecialClearButton>
      </StyledSpecialField>

      {showSetter && (
        <StyledSpecialBreakSetter onSubmit={onSubmit}>
          <StyledDetailCloseButton
            onClick={() => {
              setShowSetter(false);
            }}
          >
            <SVG name="close" />
          </StyledDetailCloseButton>

          <header>
            <h3>Special Break Setter</h3>
            <p>
              Set your special break according to your daily routine.
            </p>
          </header>

          <StyledSpecialBreakSetterSection>
            <Time
              label="from"
              name="fromTime"
              value={values.fromTime}
              onChange={getValues}
              error={errors.fromTime}
            />
            <Time
              label="to"
              name="toTime"
              value={values.toTime}
              onChange={getValues}
              error={errors.toTime}
            />
            <StyledSpecialBreakDuration>
              Duration:&nbsp;
              {values.duration < 5 && errors.duration ? (
                <StyledSpecialBreakDurationSpan error>
                  {values.duration > 1
                    ? `${values.duration} minutes`
                    : `${values.duration} minute`}
                  &nbsp;is not a valid duration.
                </StyledSpecialBreakDurationSpan>
              ) : (
                <StyledSpecialBreakDurationSpan>
                  {values.duration >= 5 && `${values.duration} minutes`}
                </StyledSpecialBreakDurationSpan>
              )}
            </StyledSpecialBreakDuration>
          </StyledSpecialBreakSetterSection>

          <StyledSpecialBreakAction>
            <StyledButtonNormal type="submit">Save</StyledButtonNormal>
          </StyledSpecialBreakAction>
        </StyledSpecialBreakSetter>
      )}
    </>
  );
};

export default React.memo(SpecialField);
