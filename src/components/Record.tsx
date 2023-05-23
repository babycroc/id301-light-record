import React, { useEffect, useState } from "react";
import { styled } from "styled-components";

import { PieSVG } from "../assets/svg/Pie";
import { convertToHexColor } from "../utils";
import { Melody, Song } from "../types";

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
  song: Song;
}

const Container = styled.div`
  position: absolute;
  top: -25px;
  right: -300px;
  width: 600px;
  height: 600px;
`;

export const Record: React.FC<Props> = ({ startDegree, song }) => {
  const [melody, setMelody] = useState<Melody>([]);
  useEffect(() => {
    setMelody(song?.melody);
  }, [song]);

  const [initDegree, setInitDegree] = useState<number>((360 / 16) * 7);
  const degreeList = Array.from(Array(melody?.length).keys()).map(
    (i: number) => (initDegree + startDegree + (360 / 16) * i) % 360
  );

  const [time, setTime] = useState(Date.now());
  useEffect(() => {
    const interval = setInterval(() => {
      setInitDegree(initDegree + 360 / 16 / 100);
      setTime(Date.now());
    }, 1000 / 100);

    return () => {
      clearInterval(interval);
    };
  }, [initDegree]);

  const visibleDegree = (degree: number) => {
    return degree >= 90 && degree <= 270 + 22.5;
  };

  return (
    <Container>
      {degreeList.map((degree, index) =>
        visibleDegree(degree) && melody ? (
          <Pie
            key={index}
            degree={degree}
            color={convertToHexColor(melody[index])}
          />
        ) : null
      )}
    </Container>
  );
};
