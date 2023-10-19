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
