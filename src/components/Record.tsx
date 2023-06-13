import React, { useEffect, useState } from "react";
import { styled } from "styled-components";

import { PieSVG } from "../assets/svg/Pie";
import { convertToHexColor } from "../utils";
import { Color, Melody } from "../types";
import { PIE_NUM, PIE_DEGREE } from "../consts";
import { submit } from "../bluetooth";
import { useBluetoothState } from "../state/bluetooth";

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

const PieContainer = styled.div.attrs<{ degree: number; top: boolean }>(
  (props) => ({
    style: {
      transform: `rotate(${props.degree}deg)`,
      zIndex: `${props.top ? "10" : ""}`,
    },
  })
)`
  position: absolute;
  top: 144px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  margin-left: 50%;
  transform-origin: bottom left;
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
  top: 42px;
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

  useEffect(() => {
    if (!play) return;
    const interval = setInterval(() => {
      const dDegree = PIE_DEGREE / 50;
      setInitDegree((initDegree) => initDegree + (play ? dDegree : 0));
    }, 5000 / 50);

    return () => {
      clearInterval(interval);
    };
  }, [play]);

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

  const { characteristicCache } = useBluetoothState((state) => state);
  const onDragOver = (event: React.DragEvent<SVGUseElement>) => {
    event.preventDefault();
  };
  const onDrop = async (
    event: React.DragEvent<SVGUseElement>,
    index: number
  ) => {
    const color = event.dataTransfer.getData("color");
    if (setMelody) {
      const newMelody = melody.map((item, idx) =>
        idx == index + Math.floor(initDegree / PIE_DEGREE)
          ? (parseInt(color) as Color)
          : item
      );
      setMelody(newMelody);

      let melodyString = "";
      for (let i = 0; i < 16; i++) {
        melodyString += newMelody[i];
      }
      submit("MELODY ".concat(melodyString), characteristicCache);
    }
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
      {/* {type == "home" ? (
        <Pie
          degree={PIE_DEGREE * 9}
          color="none"
          stroke="var(--black)"
          weight={10}
          top={true}
        />
      ) : null} */}
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
                color={convertToHexColor(color)}
                stroke={color == Color.NONE ? "var(--gray)" : "none"}
                weight={color == Color.NONE ? 2 : 0}
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
