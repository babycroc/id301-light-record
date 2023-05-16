import React from "react";

interface Props {
  color?: string;
}

export const asset =
  (svg: (props: Props) => JSX.Element): React.FC<Partial<Props>> =>
  (props) =>
    svg({ ...props });
