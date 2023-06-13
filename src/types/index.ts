export enum Color {
  "RED",
  "ORANGE",
  "YELLOW",
  "GREEN",
  "BLUE",
  "PURPLE",
  "PINK",
  "WHITE",
  "NONE",
}

export type Melody = Color[];

export interface Song {
  id: string;
  date: Date;
  melody: Melody;
}
