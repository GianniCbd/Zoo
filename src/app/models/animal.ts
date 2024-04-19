import { Habitat } from './habitat';

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
  habitat: Habitat;
}
