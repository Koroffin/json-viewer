type Quest = {
  id: number;
  name: string;
  description: string;
  objective: string;
  hints: string;
  steps: {
    text: string;
  }[];
  closing_text: string;
};

type DialogNode = {
  id: number;
  text: string;
  top: number;
  left: number;
  next: {
    to: int;
    value: string;
  }[];
};
