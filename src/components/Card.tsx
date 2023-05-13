import React, { PropsWithChildren } from "react";
import { styled } from "styled-components";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  padding: 20px;
  background-color: var(--white);
  border-radius: 12px;
`;

export const Card: React.FC<PropsWithChildren> = ({ children }) => {
  return <Container>{children}</Container>;
};
