export interface Tool {
  id: string;
  name: string;
  url: string;
  description: string;
  tutorialUrl?: string;
  categoryId: string;
  order?: number;
}

export interface Category {
  id: string;
  name: string;
  tools?: Tool[];
  order?: number;
} 