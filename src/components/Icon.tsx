import React from "react";
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

interface Props {
  icon: OverridableComponent<SvgIconTypeMap>;
  size: number;
}

export const Icon: React.FC<Props> = ({ icon, size }) => {
  const IconComponent = icon;
  return <IconComponent sx={{ fontSize: size }} />;
};
