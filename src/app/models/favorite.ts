import { Animal } from './animal';

export interface Favorite {
  id: number;
  animalId: number;
  user: string;
  animal?: Animal;
}
