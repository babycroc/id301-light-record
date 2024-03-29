import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { Header } from "./Header";
import { Navigator } from "./Navigator";
import { BluetoothState, useBluetoothState } from "../state/bluetooth";

export const Layout: React.FC = () => {
  const { deviceCache } = useBluetoothState((state: BluetoothState) => state);

  const navigate = useNavigate();
  useEffect(() => {
    if (!deviceCache) {
      navigate("/connect");
    }
  }, [deviceCache, navigate]);

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Navigator />
    </>
  );
};
