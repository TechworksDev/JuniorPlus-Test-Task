export type Note = {
  id: number;
  title: string;
  text: string;
  created: string;
};

export type CreateNoteInput = {
  title: string;
  text: string;
};