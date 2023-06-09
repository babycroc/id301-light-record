import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

import { Icon } from "../components/Icon";
import { MusicIcon } from "../assets/icons";
import { Button } from "../components/Button";
import { connect } from "../bluetooth";
import { BluetoothState, useBluetoothState } from "../state/bluetooth";

const Container = styled.div`
  position: relative;
  height: calc(100vh - 108px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
`;

const Text = styled.h1`
  color: var(--primary);
  font-size: 32px;
  margin-bottom: 80px;
`;

export const Connect: React.FC = () => {
  const {
    deviceCache,
    setDeviceCache,
    characteristicCache,
    setCharacteristiceCache,
  } = useBluetoothState((state: BluetoothState) => state);

  const navigate = useNavigate();
  useEffect(() => {
    if (deviceCache) {
      navigate("/");
    }
  }, [deviceCache, navigate]);

  const connectBluetooth = () => {
    connect(
      deviceCache,
      setDeviceCache,
      characteristicCache,
      setCharacteristiceCache
    );
  };

  return (
    <Container>
      <Icon icon={MusicIcon} color="var(--primary)" />
      <Text>Light Record</Text>
      <Button onClick={connectBluetooth}>Connect</Button>
    </Container>
  );
};
