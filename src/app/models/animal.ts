import { Habitat } from './habitat';
import { Like } from './like';

export interface Animal {
  id: number;
  name: string;
  species: string;
  age: number;
  gender: string;
  favFood: string;
  weight: string;
  height: string;
  image: string;
  distribution: string;
  reproduction: string;
  habitat: Habitat;
}
