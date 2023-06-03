import React from "react";

interface Props {
  color?: string;
  stroke?: string;
  weight?: number;
  onDragOver?: React.DragEventHandler<SVGUseElement>;
  onDrop?: React.DragEventHandler<SVGUseElement>;
}

export const asset =
  (svg: (props: Props) => JSX.Element): React.FC<Partial<Props>> =>
  (props) =>
    svg({ ...props });
