import React from "react";

export function formatText(text) {
  let regex = new RegExp(`(:)`, "gi");
  const parts = text.split(regex);

  return parts.map((part, i) =>
    part.match(regex) ? <span key={i}>{part}</span> : part
  );
}
