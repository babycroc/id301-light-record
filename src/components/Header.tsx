import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

import { Icon } from "./Icon";
import { MusicIcon } from "../assets/icons";

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 16px;
  height: 50px;
  color: var(--primary);
  // margin-top: -50px;
`;

export const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Icon icon={MusicIcon} size={32} onClick={() => navigate("/")} />
    </Container>
  );
};
