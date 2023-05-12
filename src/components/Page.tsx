import React, { PropsWithChildren } from "react";
import { styled } from "styled-components";

const Container = styled.div`
  position: absolute;
  z-index: 10;
  width: 100%;
  height: 100%;
  background-color: red;
  top: 0;
  bottom: 0;
`;

export const Page: React.FC<PropsWithChildren> = ({ children }) => {
  return <Container>{children}</Container>;
};
