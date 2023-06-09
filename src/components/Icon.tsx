import React from "react";
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

interface Props {
  icon: OverridableComponent<SvgIconTypeMap>;
  size?: number;
  color?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export const Icon: React.FC<Props> = ({
  icon,
  size = 24,
  color,
  disabled = false,
  onClick,
}) => {
  const IconComponent = icon;
  return (
    <div onClick={onClick} style={onClick ? { cursor: "pointer" } : {}}>
      <IconComponent
        sx={{ fontSize: size }}
        style={
          disabled ? { color: "var(--gray)" } : color ? { color: color } : {}
        }
      />
    </div>
  );
};
