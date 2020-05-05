import React, { useState, useCallback } from "react";
import {
  StyledSpecialField,
  StyledSpecialFieldMinute,
  StyledSpecialClearButton,
} from "styles";
import { Time, SVG } from "components";

type SpecialFieldProps = {
  time: string;
  duration: string;
};

type Props = {
  onFieldSubmit?: (values: SpecialFieldProps) => void;
} & React.HTMLProps<HTMLInputElement> &
  SpecialFieldProps;

const SpecialField: React.FC<Props> = ({
  time,
  duration,
  disabled,
  onFieldSubmit,
}) => {
  const [values, setValues] = useState({ time, duration });

  const [success, setSuccess] = useState(false);

  const [errors, setErrors] = useState({
    time: false,
    duration: false,
  });

  const getValues = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!values.time && values.duration) {
        setErrors((prevState) => ({
          ...prevState,
          time: true,
        }));
      } else {
        setErrors((prevState) => ({
          ...prevState,
          time: false,
        }));
      }

      if (!values.duration && values.time) {
        setErrors((prevState) => ({
          ...prevState,
          duration: true,
        }));
      } else {
        setErrors((prevState) => ({
          ...prevState,
          duration: false,
        }));
      }

      if (
        (values.time && values.duration && onFieldSubmit) ||
        (!values.time && !values.duration && onFieldSubmit)
      ) {
        setSuccess(true);
        onFieldSubmit(values);

        setTimeout(() => setSuccess(false), 1000);
      }
    },
    [onFieldSubmit, values]
  );

  const onClear = useCallback(() => {
    const newValues = { time: "", duration: "" };
    if (onFieldSubmit) {
      setValues(newValues);
      onFieldSubmit(newValues);
    }
  }, [onFieldSubmit]);

  return (
    <StyledSpecialField
      disabled={disabled}
      onSubmit={onSubmit}
      success={success}
      error={errors.time || errors.duration}
    >
      <Time
        name="time"
        value={values.time}
        onChange={getValues}
        disabled={disabled}
        error={errors.time}
      />
      <span />
      <StyledSpecialFieldMinute
        type="number"
        name="duration"
        placeholder="min"
        value={values.duration}
        onChange={getValues}
        disabled={disabled}
        error={errors.duration}
      />

      <StyledSpecialClearButton
        type="button"
        success={success}
        onClick={onClear}
      >
        <SVG name="close" />
      </StyledSpecialClearButton>

      <button type="submit" aria-hidden="true" />
    </StyledSpecialField>
  );
};

export default React.memo(SpecialField);
