import React from "react";
import { styled } from "styled-components";

import { Color } from "../types";

const Container = styled.div`
  position: relative;
  border-radius: 8px;
`;

const convertToHexColor = (color: Color) => {
  let hexColor = null;
  switch (color) {
    case Color.RED:
      hexColor = getComputedStyle(document.body).getPropertyValue("--red");
      break;
    case Color.ORANGE:
      hexColor = getComputedStyle(document.body).getPropertyValue("--orange");
      break;
    case Color.YELLOW:
      hexColor = getComputedStyle(document.body).getPropertyValue("--yellow");
      break;
    case Color.GREEN:
      hexColor = getComputedStyle(document.body).getPropertyValue("--green");
      break;
    case Color.BLUE:
      hexColor = getComputedStyle(document.body).getPropertyValue("--blue");
      break;
    case Color.PURPLE:
      hexColor = getComputedStyle(document.body).getPropertyValue("--purple");
      break;
    case Color.PINK:
      hexColor = getComputedStyle(document.body).getPropertyValue("--pink");
      break;
    case Color.NONE:
      hexColor = getComputedStyle(document.body).getPropertyValue("--white");
      break;
    default:
      hexColor = getComputedStyle(document.body).getPropertyValue("--white");
      break;
  }
  return hexColor;
};

interface Props {
  size?: number;
  color: Color;
}

export const Cell: React.FC<Props> = ({ size = 24, color }) => {
  return (
    <Container
      style={{
        minWidth: `${size}px`,
        minHeight: `${size}px`,
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: convertToHexColor(color),
      }}
    />
  );
};
