import React from "react";
import PropTypes from "prop-types";

Slider.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  value: PropTypes.number,
  timeType: PropTypes.string,
  rangeType: PropTypes.string,
  onChange: PropTypes.func
};

Slider.defaultProps = {
  min: 1,
  max: 60,
  value: 30,
  rangeType: "min"
};

function Slider({ min, max, value, timeType, rangeType, onChange }) {
  return (
    <div className="slider">
      <div className="time">
        <p className="time__type">{timeType}</p>
        <p className="time__initial">
          {value} {rangeType}
        </p>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        style={{
          "--min": min,
          "--max": max,
          "--val": value
        }}
      />
    </div>
  );
}

export default React.memo(Slider);
