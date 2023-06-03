import React from "react";
import { styled } from "styled-components";

import { Color } from "../types";
import { convertToHexColor } from "../utils";

const Container = styled.div`
  position: relative;
  border-radius: 8px;
`;

interface Props {
  size?: number;
  color: Color;
  onDragStart?: React.DragEventHandler<HTMLDivElement>;
}

export const Cell: React.FC<Props> = ({ size = 24, color, ...props }) => {
  return (
    <Container
      style={{
        minWidth: `${size}px`,
        minHeight: `${size}px`,
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: convertToHexColor(color),
      }}
      {...props}
    />
  );
};
