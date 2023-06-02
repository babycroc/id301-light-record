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
const EmptyPie: React.FC<PieProps> = ({ degree }) => {
  return (
    <PieContainer style={{ transform: `rotate(${degree}deg)` }}>
      <PieOutlineSVG weight={1} />
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
  melody = [],
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
      {type == "home" ? (
        <PieContainer
          style={{ zIndex: "10", transform: `rotate(${(360 / 16) * 9}deg)` }}
        >
          <PieOutlineSVG color="var(--black)" />
        </PieContainer>
      ) : null}
      {type == "home"
        ? Array(PIE_NUM / 2 + 1)
            .fill(0)
            .map((_, index) => {
              const displayIndex = index + Math.floor(initDegree / PIE_DEGREE);
              return (
                <Pie
                  key={index}
                  degree={calcDegreeFromPos(displayIndex)}
                  color={convertToHexColor(
                    melody[displayIndex % melody.length]
                  )}
                />
              );
            })
        : null}
      {type == "create"
        ? melody
            .concat(Array(PIE_NUM / 2 + 1).fill(Color.NONE))
            .slice(0, PIE_NUM / 2 + 1)
            .map((color, index) => {
              const displayIndex = index + Math.floor(initDegree / PIE_DEGREE);

              return color == Color.NONE ? (
                <EmptyPie
                  key={index}
                  degree={calcDegreeFromPos(displayIndex)}
                />
              ) : (
                <Pie
                  key={index}
                  degree={calcDegreeFromPos(displayIndex)}
                  color={convertToHexColor(color)}
                />
              );
            })
        : null}
    </Container>
  );
};
