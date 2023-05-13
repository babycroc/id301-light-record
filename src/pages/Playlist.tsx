import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { styled } from "styled-components";

import { db } from "../firebase";
import { Record } from "../types";
import { Card } from "../components/Card";
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
  record: Record;
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

const PlaylistItem: React.FC<Props> = ({ record }) => {
  return (
    <Card>
      <Header>
        {`${record.date.getFullYear()}.${record.date.getMonth()}.${record.date.getDate()}`}
        <IconContainer>
          <EditIcon />
          <DeleteIcon />
        </IconContainer>
      </Header>

      <CellContainer>
        {record.sequence.map((color, index) => (
          <Cell key={index} size={24} color={color} />
        ))}
      </CellContainer>

      <ControlContainer>
        <PlayIcon />
        <PauseIcon />
        <StopIcon />
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
  const [records, setRecords] = useState<Record[]>([]);
  const docRef = collection(db, "records");

  useEffect(() => {
    onSnapshot(docRef, (snapshot) => {
      const records = snapshot.docs.map((doc) => {
        const id = doc.id;
        const data = doc.data();
        return {
          id: id,
          date: new Date(data.date.seconds * 1000),
          sequence: data.sequence,
        };
      });
      setRecords(records);
    });
  });

  return (
    <Container>
      {records.map((record, index) => (
        <PlaylistItem key={index} record={record} />
      ))}
      <Button>
        <AddIcon />
      </Button>
    </Container>
  );
};
