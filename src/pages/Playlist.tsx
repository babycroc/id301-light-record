import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { styled } from "styled-components";

import { db } from "../firebase";
import { Song } from "../types";
import { Card } from "../components/Card";
import { Icon } from "../components/Icon";
import { Cell } from "../components/Cell";
import { Button } from "../components/Button";
import {
  EditIcon,
  DeleteIcon,
  PlayIcon,
  PauseIcon,
  StopIcon,
  AddIcon,
} from "../assets/icons";

interface Props {
  song: Song;
}

const Header = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: var(--gray);
  font-size: 16px;
`;

const IconContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

const CellContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  gap: 4px;
  overflow: scroll;
`;

const ControlContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 16px;
`;

const PlaylistItem: React.FC<Props> = ({ song }) => {
  return (
    <Card>
      <Header>
        {`${song.date.getFullYear()}.${song.date.getMonth()}.${song.date.getDate()}`}
        <IconContainer>
          <Icon icon={EditIcon} />
          <Icon icon={DeleteIcon} />
        </IconContainer>
      </Header>

      <CellContainer>
        {song.melody.map((color, index) => (
          <Cell key={index} color={color} />
        ))}
      </CellContainer>

      <ControlContainer>
        <Icon icon={PlayIcon} size={36} />
        <Icon icon={PauseIcon} size={36} />
        <Icon icon={StopIcon} size={36} />
      </ControlContainer>
    </Card>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin: 16px 24px;
`;

export const Playlist: React.FC = () => {
  const [playlist, setPlaylist] = useState<Song[]>([]);
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
      setPlaylist(playlist);
    });
  });

  return (
    <Container>
      {playlist.map((song, index) => (
        <PlaylistItem key={index} song={song} />
      ))}
      <Button>
        <AddIcon />
      </Button>
    </Container>
  );
};
