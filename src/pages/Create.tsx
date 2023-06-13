import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { styled } from "styled-components";

import { db } from "../firebase";
import { Record } from "../components/Record";
import { Color, Melody } from "../types";
import { Cell } from "../components/Cell";
import { CheckIcon } from "../assets/icons";
import { Icon } from "../components/Icon";
import { PIE_DEGREE, PIE_NUM } from "../consts";

interface ControlProps {
  saveMelody: () => void;
}

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

const ControlDisplay: React.FC<ControlProps> = ({ saveMelody }) => {
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
    <ControlContainer>
      {Object.values(Color)
        .filter((v) => !isNaN(Number(v)))
        // .filter((color) => color !== Color.NONE)
        .map((color, index) => (
          <Cell
            key={index}
            size={40}
            color={color as Color}
            background={Color.NONE}
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
        <Icon icon={CheckIcon} size={24} onClick={saveMelody} />
      </IconContainer>
    </ControlContainer>
  );
};

interface MelodyCellProps {
  melody: Melody;
  onRotate: (degree: number) => void;
}

const MelodyContainer = styled.div`
  position: absolute;
  left: -12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 48px 0 calc(100vh - 496px) 0;
  height: calc(100vh - 108px);
  overflow-y: scroll;
`;

const MelodyCellDisplay: React.FC<MelodyCellProps> = ({ melody, onRotate }) => {
  const cellSize = 32;

  const onScroll = (event: React.UIEvent) => {
    onRotate((event.currentTarget.scrollTop / (cellSize + 12)) * PIE_DEGREE);
  };

  return (
    <MelodyContainer onScroll={onScroll}>
      {melody.map((color, index) => (
        <Cell
          key={index}
          size={cellSize}
          color={color as Color}
          background={Color.NONE}
        />
      ))}
    </MelodyContainer>
  );
};

const Container = styled.div`
  position: relative;
  height: calc(100vh - 108px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

export const Create: React.FC = () => {
  const [melody, setMelody] = useState<Melody>(Array(PIE_NUM).fill(Color.NONE));
  const [degree, setDegree] = useState(0);
  const docRef = collection(db, "songs");
  const navigate = useNavigate();

  const onRotate = (degree: number) => {
    setDegree(degree);
  };

  const saveMelody = () => {
    addDoc(docRef, { date: new Date(), melody: melody });
    navigate("/playlist");
  };

  return (
    <Container>
      <Record
        type="create"
        melody={melody}
        setMelody={setMelody}
        startDegree={degree}
      />
      <MelodyCellDisplay melody={melody} onRotate={onRotate} />
      <ControlDisplay saveMelody={saveMelody} />
    </Container>
  );
};
