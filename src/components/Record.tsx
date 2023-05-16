import React from "react";
import { styled } from "styled-components";

import { PieSVG } from "../assets/svg/Pie";
import { convertToHexColor } from "../utils";

interface PieProps {
  degree: number;
  color: string;
}

const PieContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  width: 600px;
  height: 600px;
  padding-bottom: 300px;
`;

const Pie: React.FC<PieProps> = ({ degree, color }) => {
  return (
    <PieContainer style={{ transform: `rotate(${degree}deg)` }}>
      <PieSVG color={color} />
    </PieContainer>
  );
};
interface Props {
  startDegree: number;
}

const Container = styled.div`
  position: absolute;
  top: -25px;
  right: -300px;
  width: 600px;
  height: 600px;
`;

export const Record: React.FC<Props> = ({ startDegree }) => {
  const splitNum = 16;
  const degreeList = Array.from(Array(splitNum).keys()).map(
    (i) => (startDegree + (360 / splitNum) * i) % 360
  );
  console.log(Array.from(Array(splitNum).keys()));
  return (
    <Container>
      {degreeList.map((degree, index) => (
        <Pie
          key={index}
          degree={degree}
          color={convertToHexColor(Math.floor(Math.random() * 8))} // TODO: apply real colors
        />
      ))}
    </Container>
  );
};
