import { create } from "zustand";

export interface BluetoothState {
  deviceCache: BluetoothDevice | null;
  setDeviceCache: (deviceCache: BluetoothDevice | null) => void;
  characteristicCache: BluetoothRemoteGATTCharacteristic | null;
  setCharacteristiceCache: (
    characteristicCache: BluetoothRemoteGATTCharacteristic | null
  ) => void;
}

export const useBluetoothState = create<BluetoothState>((set) => ({
  deviceCache: null,
  setDeviceCache: (deviceCache: BluetoothDevice | null) => set({ deviceCache }),
  characteristicCache: null,
  setCharacteristiceCache: (
    characteristicCache: BluetoothRemoteGATTCharacteristic | null
  ) => set({ characteristicCache }),
}));
