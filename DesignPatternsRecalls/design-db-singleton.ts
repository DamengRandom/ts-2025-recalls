import { BaseRecord, Database, Pokemon } from "./design-db-original.js";

// Singleton Pattern: can return one instance of a class, (here is how)

// function createDatabase<T extends BaseRecord>(): Database<T> {
//   class InMemoryDatabase implements Database<T> {
//     private db: Record<string, T> = {};

//     public set(newValue: T): void {
//       this.db[newValue.id] = newValue;
//     }

//     public get(id: string): T {
//       return this.db[id];
//     }
//   }

//   const dbInstance = new InMemoryDatabase(); // return class instance instead of class

//   return dbInstance; 
// }

// const pokemonDB = createDatabase<Pokemon>();

// ############################### Or another way to implement Singleton Pattern ###############################

function createDatabase<T extends BaseRecord>() {
  class InMemoryDatabase implements Database<T> {

    static instance: InMemoryDatabase = new InMemoryDatabase();
    constructor() {};

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

const PokemonDB = createDatabase<Pokemon>();

PokemonDB.instance.set({
  id: 'Bulbasaur',
  attack: 100,
  defense: 100,
}); 

const firstPokemon = PokemonDB.instance.get('Bulbasaur');


console.log("First Pokemon: ", firstPokemon);
