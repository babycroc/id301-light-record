import React, { useEffect, useState } from "react";
import { styled } from "styled-components";

import { PieSVG } from "../assets/svg/Pie";
import { PieOutlineSVG } from "../assets/svg/PieOutline";
import { convertToHexColor } from "../utils";
import { Color, Melody } from "../types";
import { PIE_NUM, PIE_DEGREE } from "../consts";

interface PieProps {
  degree: number;
  color?: string;
  weight?: number;
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
  type: "home" | "create";
  startDegree?: number;
  melody?: Melody;
  play?: boolean;
}

const Container = styled.div`
  position: absolute;
  top: -25px;
  right: -300px;
  width: 600px;
  height: 600px;
`;

export const Record: React.FC<Props> = ({
  type,
  startDegree = 0,
  melody = [Color.NONE],
  play = false,
}) => {
  const [initDegree, setInitDegree] = useState<number>(startDegree);
  const calcDegreeFromPos = (position: number) => {
    return initDegree + PIE_DEGREE * (12 - position);
  };

  const [time, setTime] = useState(Date.now());
  useEffect(() => {
    const interval = setInterval(() => {
      const dDegree = PIE_DEGREE / 100;
      setInitDegree(initDegree + (play ? dDegree : 0));
      setTime(Date.now());
    }, 1000 / 100);

    return () => {
      clearInterval(interval);
    };
  }, [initDegree, play]);

  return (
    <Container>
      <PieContainer
        style={{ zIndex: "10", transform: `rotate(${(360 / 16) * 9}deg)` }}
      >
        <PieOutlineSVG color="var(--black)" />
      </PieContainer>
      {type == "home"
        ? Array(PIE_NUM / 2 + 1)
            .fill(0)
            .map((_, index) => {
              const startIndex = index + Math.floor(initDegree / PIE_DEGREE);
              return (
                <Pie
                  key={startIndex}
                  degree={calcDegreeFromPos(startIndex)}
                  color={convertToHexColor(melody[startIndex % melody.length])}
                />
              );
            })
        : null}
    </Container>
  );
};
