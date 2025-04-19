export interface Pokemon {
  id: string;
  attack: number;
  defense: number;
}

export interface BaseRecord {
  id: string;
}

export type DatabaseInstanceType<T extends BaseRecord> = new () => Database<T>;

export interface Database<T extends BaseRecord> {
  set(newValue: T): void
  get(id: string): T | undefined
}

class InMemoryDatabase<T extends BaseRecord> implements Database<T> {
  private db: Record<string, T> = {};

  public set(newValue: T): void {
    this.db[newValue.id] = newValue;
  }

  public get(id: string): T {
    return this.db[id];
  }
}

const pokemonDB = new InMemoryDatabase<Pokemon>();

pokemonDB.set({
  id: 'Bulbasaur',
  attack: 100,
  defense: 100,
});

const firstPokemon = pokemonDB.get('Bulbasaur');

console.log("First Pokemon: ", firstPokemon);

