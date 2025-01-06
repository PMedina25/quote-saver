import { Quote } from "./Quote";

export interface Work {
  id: number;
  title: string;
  author: string;
  type: string;
  quotes?: Quote[];
}
