export enum BoardStatus {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PREVATE',
}

export interface Board {
  id: string;
  title: string;
  description: string;
  status: BoardStatus;
}
