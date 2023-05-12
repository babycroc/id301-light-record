import React from "react";
import { styled } from "styled-components";

import Logo from "../assets/react.svg";

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 16px;
  height: 50px;
`;

export const Header: React.FC = () => {
  return (
    <Container>
      <img src={Logo} />
    </Container>
  );
};
