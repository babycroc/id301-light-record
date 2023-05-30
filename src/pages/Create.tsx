import React, { useState } from "react";
import { styled } from "styled-components";

import { Record } from "../components/Record";
import { Melody } from "../types";

const Container = styled.div`
  position: relative;
  height: calc(100vh - 108px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

export const Create: React.FC = () => {
  const [melody, setMelody] = useState<Melody>();

  return (
    <Container>
      <Record startDegree={0} melody={melody} />
    </Container>
  );
};
