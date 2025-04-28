
export interface CardField {
  id: string;
  type: 'text' | 'image';
  content: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fontSize?: number;
  fontFamily?: string;
  color?: string;
}

export interface Card {
  id: string;
  name: string;
  fields: CardField[];
  collectionId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CardCollection {
  id: string;
  name: string;
  description: string;
  cardCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ImportedCardData {
  fieldName: string;
  fieldValue: string;
}
