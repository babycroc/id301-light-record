import React, { useEffect, useState } from "react";
import { styled } from "styled-components";

import { PieSVG } from "../assets/svg/Pie";
import { convertToHexColor } from "../utils";
import { Color, Melody } from "../types";
import { PIE_NUM, PIE_DEGREE } from "../consts";

interface PieProps {
  degree: number;
  color?: string;
  stroke?: string;
  weight?: number;
  top?: boolean;
  onDragOver?: React.DragEventHandler<SVGUseElement>;
  onDrop?: React.DragEventHandler<SVGUseElement>;
  // onTouchMove?: React.TouchEventHandler<SVGUseElement>;
  // onTouchEnd?: React.TouchEventHandler<SVGUseElement>;
}

const PieContainer = styled.div<PieProps>`
  position: absolute;
  top: 144px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  margin-left: 50%;
  transform-origin: bottom left;
  transform: ${(props) => `rotate(${props.degree}deg)`};
  z-index: ${(props) => (props.top ? "10" : "")};
`;

const Pie: React.FC<PieProps> = ({
  degree,
  color,
  stroke,
  weight,
  top,
  ...props
}) => {
  return (
    <PieContainer degree={degree} top={top}>
      <PieSVG color={color} stroke={stroke} weight={weight} {...props} />
    </PieContainer>
  );
};

interface Props {
  type: "home" | "create";
  startDegree?: number;
  melody?: Melody;
  setMelody?: (melody: Melody) => void;
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
  setMelody,
  play = false,
}) => {
  const [displayMelody, setDisplayMelody] = useState<Melody>(melody);

  const [initDegree, setInitDegree] = useState<number>(startDegree);
  const calcDegreeFromPos = (position: number) => {
    return initDegree + PIE_DEGREE * (12 - position);
  };

  const [_, setTime] = useState(Date.now());
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

  useEffect(() => {
    if (type == "create") {
      setInitDegree(startDegree);
      setDisplayMelody(
        melody
          .slice(Math.floor(startDegree / PIE_DEGREE))
          .slice(0, PIE_NUM / 2 + 1)
      );
    }
  }, [type, melody, startDegree]);

  const onDragOver = (event: React.DragEvent<SVGUseElement>) => {
    event.preventDefault();
  };
  const onDrop = async (
    event: React.DragEvent<SVGUseElement>,
    index: number
  ) => {
    const color = event.dataTransfer.getData("color");
    if (setMelody)
      setMelody(
        melody.map((item, idx) =>
          idx == index + Math.floor(initDegree / PIE_DEGREE)
            ? (parseInt(color) as Color)
            : item
        )
      );
  };
  // const onTouchMove = (event: React.TouchEvent<SVGUseElement>) => {
  //   event.preventDefault();
  // };
  // const onTouchEnd = async (
  //   event: React.TouchEvent<SVGUseElement>,
  //   index: number
  // ) => {
  //   const color = localStorage.getItem("color");
  //   if (color) {
  //     const numCells = index > melody.length ? index - melody.length + 1 : 1;
  //     setMelody(
  //       melody
  //         .concat(new Array(numCells).fill(Color.NONE))
  //         .map((item, idx) =>
  //           idx == index ? (parseInt(color) as Color) : item
  //         )
  //     );
  //   }
  // };

  return (
    <Container>
      {type == "home" ? (
        <Pie
          degree={PIE_DEGREE * 9}
          color="none"
          stroke="var(--black)"
          weight={10}
          top={true}
        />
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
        ? displayMelody.map((color, index) => {
            const displayIndex = index + Math.floor(initDegree / PIE_DEGREE);
            return (
              <Pie
                key={index}
                degree={calcDegreeFromPos(displayIndex)}
                color={
                  color == Color.NONE
                    ? "var(--white)"
                    : convertToHexColor(color)
                }
                stroke={color == Color.NONE ? "var(--black)" : "none"}
                weight={color == Color.NONE ? 3 : 0}
                onDragOver={onDragOver}
                onDrop={(event: React.DragEvent<SVGUseElement>) =>
                  onDrop(event, index)
                }
                // onTouchMove={onTouchMove}
                // onTouchEnd={(event: React.TouchEvent<SVGUseElement>) =>
                //   onTouchEnd(event, index)
                // }
              />
            );
          })
        : null}
    </Container>
  );
};
