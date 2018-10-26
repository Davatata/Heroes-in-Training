export interface Hero {
  design: string;
  role: 'TANK' | 'DAMAGE' | 'HEALER';
  difficulty: 1 | 2 | 3;
  heroDetailDescription: string;
  age: number;
  realName: string;
  heroName: string;
  occupation: string;
  baseOfOperations: string;
  affiliation: string;
  heroQuote: string;
  heroBackstory: string;
  abilities: Ability[];
  art: string[];
}

export interface Ability {
  name: string;
  description: string;
  icon: string;
}
