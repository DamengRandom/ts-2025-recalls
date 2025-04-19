// Factory Pattern: can define the class inside a function, (here is how)

import { BaseRecord, Database, DatabaseInstanceType, Pokemon } from "./design-db-original.js";

function createDatabase<T extends BaseRecord>(): DatabaseInstanceType<T> {
  class InMemoryDatabase implements Database<T> {
    private db: Record<string, T> = {};

    public set(newValue: T): void {
      this.db[newValue.id] = newValue;
    }

    public get(id: string): T {
      return this.db[id];
    }
  }

  return InMemoryDatabase;
}

const PokemonDBInsace = createDatabase<Pokemon>();

const pokemonDB = new PokemonDBInsace();

pokemonDB.set({
  id: 'Bulbasaur',
  attack: 100,
  defense: 100,
});

const firstPokemon = pokemonDB.get('Bulbasaur');

console.log("First Pokemon: ", firstPokemon);
