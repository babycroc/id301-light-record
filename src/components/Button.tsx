import React, { PropsWithChildren } from "react";
import { styled } from "styled-components";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  color: var(--white);
  background-color: var(--primary);
  border-radius: 12px;
`;

export const Button: React.FC<PropsWithChildren> = ({ children }) => {
  return <Container>{children}</Container>;
};
