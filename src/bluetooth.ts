import { FormEvent } from "react";

// Launch Bluetooth device chooser and connect to the selected
export const connect = async (
  deviceCache: BluetoothDevice | null,
  setDeviceCache: (deviceCache: BluetoothDevice | null) => void,
  characteristicCache: BluetoothRemoteGATTCharacteristic | null,
  setCharacteristiceCache: (
    characteristicCache: BluetoothRemoteGATTCharacteristic | null
  ) => void
) => {
  return await (deviceCache
    ? Promise.resolve(deviceCache)
    : requestBluetoothDevice(
        deviceCache,
        setDeviceCache,
        characteristicCache,
        setCharacteristiceCache
      )
  )
    ?.then((device: BluetoothDevice | null) =>
      device
        ? connectDeviceAndCacheCharacteristic(
            device,
            characteristicCache,
            setCharacteristiceCache
          )
        : null
    )
    ?.then(
      (characteristic: BluetoothRemoteGATTCharacteristic | undefined | null) =>
        characteristic ? startNotifications(characteristic) : null
    )
    .catch((error: string) => log(error));
};

// Disconnect from the connected device
export const disconnect = (
  deviceCache: BluetoothDevice | null,
  setDeviceCache: (deviceCache: BluetoothDevice | null) => void,
  characteristicCache: BluetoothRemoteGATTCharacteristic | null,
  setCharacteristiceCache: (
    characteristicCache: BluetoothRemoteGATTCharacteristic | null
  ) => void
) => {
  if (deviceCache) {
    log('Disconnecting from "' + deviceCache?.name + '" bluetooth device...');
    deviceCache.removeEventListener("gattserverdisconnected", (event: Event) =>
      handleDisconnection(event, characteristicCache, setCharacteristiceCache)
    );

    if (deviceCache.gatt?.connected) {
      deviceCache.gatt.disconnect();
      log('"' + deviceCache.name + '" bluetooth device disconnected');
    } else {
      log(
        '"' + deviceCache.name + '" bluetooth device is already disconnected'
      );
    }
  }
  //   // Added condition
  //   if (characteristicCache) {
  //     characteristicCache.removeEventListener(
  //       "characteristicvaluechanged",
  //       handleCharacteristicValueChanged
  //     );
  //     setCharacteristiceCache(null);
  //   }

  setDeviceCache(null);
};

// Handle form submit event
export const submit = (
  event: FormEvent,
  inputField: HTMLInputElement,
  characteristicCache: BluetoothRemoteGATTCharacteristic | null
) => {
  event.preventDefault(); // Prevent form sending
  send(inputField?.value, characteristicCache); // Send text field contents
  inputField.value = ""; // Zero text field
  inputField?.focus(); // Focus on text field
};

const requestBluetoothDevice = (
  deviceCache: BluetoothDevice | null,
  setDeviceCache: (deviceCache: BluetoothDevice | null) => void,
  characteristicCache: BluetoothRemoteGATTCharacteristic | null,
  setCharacteristiceCache: (
    characteristicCache: BluetoothRemoteGATTCharacteristic | null
  ) => void
) => {
  log("Requesting bluetooth device...");

  return (
    navigator.bluetooth &&
    navigator.bluetooth
      .requestDevice({
        filters: [{ services: [0xffe0] }],
      })
      .then((device) => {
        log('"' + device.name + '" bluetooth device selected');
        setDeviceCache(device);

        // Added line
        deviceCache?.addEventListener(
          "gattserverdisconnected",
          (event: Event) =>
            handleDisconnection(
              event,
              characteristicCache,
              setCharacteristiceCache
            )
        );

        return deviceCache;
      })
  );
};

// Connect to the device specified, get service and characteristic
const connectDeviceAndCacheCharacteristic = (
  device: BluetoothDevice,
  characteristicCache: BluetoothRemoteGATTCharacteristic | null,
  setCharacteristiceCache: (
    characteristicCache: BluetoothRemoteGATTCharacteristic | null
  ) => void
) => {
  if (device.gatt?.connected && characteristicCache) {
    return Promise.resolve(characteristicCache);
  }

  log("Connecting to GATT server...");

  return device.gatt
    ?.connect()
    .then((server: BluetoothRemoteGATTServer) => {
      log("GATT server connected, getting service...");

      return server.getPrimaryService(0xffe0);
    })
    .then((service: BluetoothRemoteGATTService) => {
      log("Service found, getting characteristic...");

      return service.getCharacteristic(0xffe1);
    })
    .then((characteristic: BluetoothRemoteGATTCharacteristic) => {
      log("Characteristic found");
      setCharacteristiceCache(characteristic);

      return characteristicCache;
    });
};

// Enable the characteristic changes notification
const startNotifications = (
  characteristic: BluetoothRemoteGATTCharacteristic | null
) => {
  log("Starting notifications...");

  return characteristic?.startNotifications().then(() => {
    log("Notifications started");
    // // Added line
    // characteristic?.addEventListener(
    //   "characteristicvaluechanged",
    //   handleCharacteristicValueChanged
    // );
  });
};

// // Data receiving
// const handleCharacteristicValueChanged = (event: Event) => {
//     const value = new TextDecoder().decode(event?.target?.value);
//     for (const c of value) {
//       if (c === "\n") {
//         const data = readBuffer.trim();
//         readBuffer = "";
//         if (data) {
//           receive(data);
//         }
//       } else {
//         readBuffer += c;
//       }
//     }
// };

// // Received data handling
// const receive = (data: string) => {
//   log(data, "in");
// };

const handleDisconnection = (
  event: Event,
  characteristicCache: BluetoothRemoteGATTCharacteristic | null,
  setCharacteristiceCache: (
    characteristicCache: BluetoothRemoteGATTCharacteristic | null
  ) => void
) => {
  const device = event.target;

  log(
    '"' +
      (device as BluetoothDevice).name +
      '" bluetooth device disconnected, trying to reconnect...'
  );

  connectDeviceAndCacheCharacteristic(
    device as BluetoothDevice,
    characteristicCache,
    setCharacteristiceCache
  )
    ?.then((characteristic: BluetoothRemoteGATTCharacteristic | null) => {
      if (characteristic) startNotifications(characteristic);
    })
    .catch((error: string) => log(error));
};

// Send data to the connected device
const send = (
  data: string,
  characteristicCache: BluetoothRemoteGATTCharacteristic | null
) => {
  data = String(data);

  if (!data || !characteristicCache) {
    return;
  }

  data += "\n";

  if (data.length > 20) {
    const chunks = data.match(/(.|[\r\n]){1,20}/g);

    if (chunks) {
      writeToCharacteristic(characteristicCache, chunks[0]);

      for (let i = 1; i < chunks.length; i++) {
        setTimeout(() => {
          writeToCharacteristic(characteristicCache, chunks[i]);
        }, i * 100);
      }
    }
  } else {
    writeToCharacteristic(characteristicCache, data);
  }

  log(data, "out");
};

const writeToCharacteristic = (
  characteristic: BluetoothRemoteGATTCharacteristic,
  data: string
) => {
  characteristic.writeValue(new TextEncoder().encode(data));
};

// Output to terminal
const log = (data: string, type = "") => {
  console.log(type, data);
};
