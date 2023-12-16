export type IRockPaperScissors = "rock" | "paper" | "scissors" | "";

export interface IGame {
  amount: number;
  buenas: boolean;
  flor: boolean;
  isUSDC: boolean;
  creatorName?: string;
  joinedName?: string;
  room?: string;
  rps?: {
    creator: IRockPaperScissors;
    joined: IRockPaperScissors;
  };
  whosNext?: string;
}

export type TCard =
  | "espada-1"
  | "espada-2"
  | "espada-3"
  | "espada-4"
  | "espada-5"
  | "espada-6"
  | "espada-7"
  | "espada-10"
  | "espada-11"
  | "espada-12"
  | "oro-1"
  | "oro-2"
  | "oro-3"
  | "oro-4"
  | "oro-5"
  | "oro-6"
  | "oro-7"
  | "oro-10"
  | "oro-11"
  | "oro-12"
  | "basto-1"
  | "basto-2"
  | "basto-3"
  | "basto-4"
  | "basto-5"
  | "basto-6"
  | "basto-7"
  | "basto-10"
  | "basto-11"
  | "basto-12"
  | "copa-1"
  | "copa-2"
  | "copa-3"
  | "copa-4"
  | "copa-5"
  | "copa-6"
  | "copa-7"
  | "copa-10"
  | "copa-11"
  | "copa-12";
