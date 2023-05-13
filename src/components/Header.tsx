import React from "react";
import { styled } from "styled-components";

import { Icon } from "./Icon";
import { MusicIcon } from "../assets/icons";

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 16px;
  height: 50px;
  color: var(--primary);
`;

export const Header: React.FC = () => {
  return (
    <Container>
      <Icon icon={MusicIcon} size={32} />
    </Container>
  );
};
