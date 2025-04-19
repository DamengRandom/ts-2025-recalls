// ########################### Strategy Pattern (Maybe not a good example) ##############################

import { BaseRecord, Pokemon } from "./design-db-original.js";

function createDatabase<T extends BaseRecord>() {
  class InMemoryDatabase {
    private db: Record<string, T> = {};

    static instance: InMemoryDatabase = new InMemoryDatabase();

    constructor() {}

    public set(newValue: T): void {
      this.db[newValue.id] = newValue;
    }

    public get(id: string): T {
      return this.db[id];
    }

    public selectBest(scoreStrategy: (item: T) => number): T | undefined {
      const found: { max: number; item: T | undefined } = { max: 0, item: undefined };

      Object.values(this.db).reduce((val, acc) => {
        
        const score = scoreStrategy(acc);

        if (score > val.max) {
          val.max = score;
          val.item = acc;
        }

        return val;
      }, found);

      
      return found.item;
    }
  }

  return InMemoryDatabase;
}

const PokemonDB = createDatabase<Pokemon>();

PokemonDB.instance.set({
  id: 'Bulbasaur',
  attack: 200,
  defense: 600,
});

PokemonDB.instance.set({
  id: 'Spinosaur',
  attack: 400,
  defense: 400,
});

const bestAttackPokemon = PokemonDB.instance.selectBest(({ attack }) => attack);
const bestDefensePokemon = PokemonDB.instance.selectBest(({ defense }) => defense);

console.log("Best Attack Pokemon: ", bestAttackPokemon?.id);
console.log("Best Defense Pokemon: ", bestDefensePokemon?.id);

// result ->
// Best Attack Pokemon:  'Spinosaur'
// Best Defense Pokemon: 'Bulbasaur'
