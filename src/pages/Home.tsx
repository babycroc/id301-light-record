import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { styled } from "styled-components";

import { db } from "../firebase";
import { Song } from "../types";
import { Record } from "../components/Record";
import { Icon } from "../components/Icon";
import { PlayIcon, PauseIcon, StopIcon } from "../assets/icons";

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
  const [song, setSong] = useState<Song>();
  const docRef = collection(db, "songs");

  useEffect(() => {
    onSnapshot(docRef, (snapshot) => {
      const playlist = snapshot.docs.map((doc) => {
        const id = doc.id;
        const data = doc.data();
        return {
          id: id,
          date: new Date(data.date.seconds * 1000),
          melody: data.melody,
        };
      });
      if (playlist.length >= 1) setSong(playlist[0]);
    });
  }, []);

  return (
    <Container>
      <Record startDegree={0} song={song} />

      <ControlContainer>
        <Icon icon={PlayIcon} size={48} />
        <Icon icon={PauseIcon} size={48} />
        <Icon icon={StopIcon} size={48} />
      </ControlContainer>
    </Container>
  );
};
