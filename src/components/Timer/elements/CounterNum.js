import React from "react";

const getText = text => {
  let regex = new RegExp(`(:)`, "gi");
  const parts = text.split(regex);
  return parts.map((part, i) =>
    part.match(regex) ? <span key={i}>{part}</span> : part
  );
};

function CounterNum() {
  return (
    <div className="counter-num">
      <div className="counter-num__timer">{getText("25:00")}</div>
      <div className="counter-num__heading">Work</div>
    </div>
  );
}

export default CounterNum;
