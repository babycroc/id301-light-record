import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { styled } from "styled-components";

import { db } from "../firebase";
import { Song } from "../types";
import { Record } from "../components/Record";
import { Icon } from "../components/Icon";
import { PlayIcon, PauseIcon, StopIcon } from "../assets/icons";
import { submit } from "../bluetooth";
import { BluetoothState, useBluetoothState } from "../state/bluetooth";
import { PIE_NUM } from "../consts";

const Container = styled.div`
  position: relative;
  height: calc(100vh - 108px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

const ControlContainer = styled.div`
  position: absolute;
  bottom: 48px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 36px;
  background-color: var(--white);
  border-radius: 16px;
  padding: 20px 32px;
`;

export const Home: React.FC = () => {
  const [play, setPlay] = useState<boolean>(false);

  const [song, setSong] = useState<Song>();
  const docRef = collection(db, "songs");

  useEffect(() => {
    onSnapshot(docRef, (snapshot: any) => {
      const playlist = snapshot.docs.map((doc: any) => {
        const id = doc.id;
        const data = doc.data();
        return {
          id: id,
          date: new Date(data.date.seconds * 1000),
          melody: data.melody,
        };
      });

      const currentSong = localStorage.getItem("currentSong");
      if (currentSong)
        setSong(playlist.filter((v: Song) => v.id === currentSong)[0]);
      else setSong(playlist[0]);
      console.log(song);
    });
  }, []);

  const { characteristicCache } = useBluetoothState(
    (state: BluetoothState) => state
  );

  const playRecord = () => {
    setPlay(true);

    let melody = "";
    for (let i = 0; i < PIE_NUM; i++) {
      melody += song?.melody[i];
    }
    submit("PLAY " + melody, characteristicCache);
  };
  const pauseRecord = () => {
    setPlay(false);
    submit("PAUSE", characteristicCache);
  };
  const stopRecord = () => {
    setPlay(false);
    submit("STOP", characteristicCache);
  };

  return (
    <Container>
      <Record type="home" melody={song?.melody} play={play} />

      <ControlContainer>
        <Icon icon={PlayIcon} size={48} disabled={play} onClick={playRecord} />
        <Icon
          icon={PauseIcon}
          size={48}
          disabled={!play}
          onClick={pauseRecord}
        />
        <Icon icon={StopIcon} size={48} onClick={stopRecord} />
      </ControlContainer>
    </Container>
  );
};
