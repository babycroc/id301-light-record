import React, { ChangeEvent, FormEvent, useState } from "react";
import { styled } from "styled-components";

import { BluetoothState, useBluetoothState } from "../state/bluetooth";
import { submit } from "../bluetooth";

const Container = styled.div`
  position: relative;
  height: calc(100vh - 108px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  margin: 16px 24px;
`;

export const Settings: React.FC = () => {
  const { characteristicCache } = useBluetoothState(
    (state: BluetoothState) => state
  );

  const [command, setCommand] = useState<string>("");
  const onChange = (event: ChangeEvent) => {
    setCommand((event.target as HTMLInputElement)?.value);
  };
  const onSubmit = (event: FormEvent) => {
    submit(event, command, characteristicCache);
    setCommand("");
  };

  return (
    <Container>
      <form onSubmit={onSubmit}>
        <input type="text" value={command} onChange={onChange} />
      </form>
    </Container>
  );
};
