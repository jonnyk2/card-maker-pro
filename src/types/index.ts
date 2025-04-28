
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
  gameType?: 'standard' | 'trading' | 'roleplaying' | 'custom';
  cardType?: string; // For categorizing cards within a game (e.g., "Monster", "Spell", "Resource")
  rarity?: string; // For games with rarity systems
  createdAt: string;
  updatedAt: string;
}

export interface CardCollection {
  id: string;
  name: string;
  description: string;
  gameType: 'standard' | 'trading' | 'roleplaying' | 'custom';
  ruleset?: string; // Optional field for game rules
  cardCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ImportedCardData {
  fieldName: string;
  fieldValue: string;
}

export interface GameTemplate {
  id: string;
  name: string;
  description: string;
  cardTypes: string[];
  defaultCardFields: Partial<CardField>[];
}
