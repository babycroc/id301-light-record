import React from "react";

interface Props {
  color?: string;
  stroke?: string;
  weight?: number;
}

export const asset =
  (svg: (props: Props) => JSX.Element): React.FC<Partial<Props>> =>
  (props) =>
    svg({ ...props });
