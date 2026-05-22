// Book model
export interface Book {
  id: string;
  title: string;
  author: string;
  publishedDate: string;
  description?: string;
  genre?: string;
  userId: number;
}
