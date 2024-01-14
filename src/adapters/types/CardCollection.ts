import { Card } from "./Card";

export interface CardCollection {
  ref: string;
  name: string;
  cards: Card[];
}
