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

export interface Record {
  id: string;
  date: Date;
  sequence: Color[];
}