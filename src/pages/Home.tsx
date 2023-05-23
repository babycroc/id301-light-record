import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";

import { db } from "../firebase";
import { Record } from "../components/Record";

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
    <>
      <Record startDegree={0} song={song} />
    </>
  );
};
