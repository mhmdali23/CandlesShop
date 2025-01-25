export interface Scent {
  id: number;
  name: string;
  description?: string;
  imageUrl?: string |null; // <-- Add this property
  image?: File|null; // <-- For file upload
}