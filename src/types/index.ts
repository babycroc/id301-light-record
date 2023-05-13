export enum Color {
  "RED",
  "ORANGE",
  "YELLOW",
  "GREEN",
  "BLUE",
  "PURPLE",
  "PINK",
  "NONE",
}

export interface Song {
  id: string;
  date: Date;
  melody: Color[];
}
