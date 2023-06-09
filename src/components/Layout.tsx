import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { Header } from "./Header";
import { Navigator } from "./Navigator";
import { BluetoothState, useBluetoothState } from "../state/bluetooth";

export const Layout: React.FC = () => {
  const { deviceCache } = useBluetoothState((state: BluetoothState) => state);
  useEffect(() => {
    if (!deviceCache) {
      window.location.href = "/connect";
    }
  }, [deviceCache]);

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
