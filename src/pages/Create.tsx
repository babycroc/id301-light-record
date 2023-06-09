import React, { useState } from "react";
import { styled } from "styled-components";

import { Record } from "../components/Record";
import { Color, Melody } from "../types";
import { Cell } from "../components/Cell";
import { CheckIcon } from "../assets/icons";
import { Icon } from "../components/Icon";

const Container = styled.div`
  position: relative;
  height: calc(100vh - 108px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

const ControlContainer = styled.div`
  position: absolute;
  width: 280px;
  bottom: 48px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

const IconContainer = styled.div`
  display: flex;
  width: 40px;
  height: 40px;
  color: var(--gray);
  border: solid 1px var(--gray);
  border-radius: 8px;
  align-items: center;
  justify-content: center;
`;

export const Create: React.FC = () => {
  const [melody, _] = useState<Melody>([]);

  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    color: Color
  ) => {
    event.dataTransfer.setData("color", color.toString());
    // localStorage.setItem("color", color.toString());
  };
  // const onTouchStart = (
  //   event: React.TouchEvent<HTMLDivElement>,
  //   color: Color
  // ) => {
  //   localStorage.setItem("color", color.toString());
  // };

  return (
    <Container>
      <Record type="create" melody={melody} />

      <ControlContainer>
        {Object.values(Color)
          .filter((v) => !isNaN(Number(v)))
          .map((color, index) => (
            <Cell
              key={index}
              size={40}
              color={color as Color}
              draggable={true}
              onDragStart={(event: React.DragEvent<HTMLDivElement>) =>
                onDragStart(event, color as Color)
              }
              // onTouchStart={(event: React.TouchEvent<HTMLDivElement>) => {
              //   onTouchStart(event, color as Color);
              // }}
            />
          ))}
        <IconContainer>
          <Icon icon={CheckIcon} size={24} />
        </IconContainer>
      </ControlContainer>
    </Container>
  );
};
