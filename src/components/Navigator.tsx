import React from "react";
import { NavLink } from "react-router-dom";
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { styled } from "styled-components";

import { Icon } from "./Icon";
import { HomeIcon, PlaylistIcon, SettingsIcon } from "../assets/icons";

interface Props {
  name: string;
  icon: OverridableComponent<SvgIconTypeMap>;
  to: string;
}

const NavItem: React.FC<Props> = ({ name, icon, to }) => {
  return (
    <NavLink
      id={name}
      to={to}
      style={({ isActive }) =>
        isActive ? { color: "var(--primary)" } : { color: "var(--black)" }
      }
    >
      <Icon icon={icon} />
    </NavLink>
  );
};

const Container = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: row;
  width: 100%;
  border-radius: 12px 12px 0 0;
  background-color: var(--white);

  & > * {
    flex: 1;
    padding: 16px;
    text-align: center;
  }
`;

export const Navigator: React.FC = () => {
  return (
    <>
      <Container>
        <NavItem name="playlist" icon={PlaylistIcon} to="/playlist" />
        <NavItem name="home" icon={HomeIcon} to="/" />
        <NavItem name="settings" icon={SettingsIcon} to="/settings" />
      </Container>
    </>
  );
};
