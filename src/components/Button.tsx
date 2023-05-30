import React, { PropsWithChildren } from "react";
import { styled } from "styled-components";

interface Props extends PropsWithChildren {
  onClick?: () => void;
}

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
  cursor: pointer;
`;

export const Button: React.FC<Props> = ({ children, onClick }) => {
  return <Container onClick={onClick}>{children}</Container>;
};
