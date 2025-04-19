// ############################ Observer Pattern & Vistor Pattern (A bit complex ..) #############################

import { BaseRecord, Pokemon } from "./design-db-original.js";

type Listener<EventType> = (event: EventType) => void;

type ObserverType<EventType> = {
  subscribe: (listener: Listener<EventType>) => () => void;
  publish: (event: EventType) => void;
}

type BeforeSetEvent<T> ={
  value: T;
  newValue: T;
}

type AfterSetEvent<T> = {
  value: T;
}

function createObserver<EventType>(): ObserverType<EventType> {
  let listeners: Listener<EventType>[] = [];

  return {
    subscribe: (listener: Listener<EventType>): () => void => {
      listeners.push(listener);

      return () => {
        listeners = listeners.filter((l) => l !== listener);
      }
    },
    publish: (event: EventType) => {
      listeners.forEach((l) => l(event));
    },
  }
}

function createDatabaseObserver<T extends BaseRecord>() {

  class InMemoryDatabase {
    private db: Record<string, T> = {};

    static instance: InMemoryDatabase = new InMemoryDatabase();

    private beforeAddListeners = createObserver<BeforeSetEvent<T>>();
    private afterAddListeners = createObserver<AfterSetEvent<T>>();

    private constructor() {}

    set(newValue: T): void {
      this.beforeAddListeners.publish({
        newValue,
        value: this.db[newValue.id],
      });

      this.afterAddListeners.publish({
        value: newValue,
      });

      this.db[newValue.id] = newValue; // assign values to db for visit function usage !!
    }

    onBeforeAdd(listener: Listener<BeforeSetEvent<T>>): () => void {
      return this.beforeAddListeners.subscribe(listener);
    }

    onAfterAdd(listener: Listener<AfterSetEvent<T>>): () => void {
      return this.afterAddListeners.subscribe(listener);
    }

    onVisit(vistor: (item: T) => void): void {
      console.log("visit db: ", this.db);
      Object.values(this.db).forEach(vistor);
    }
  }

  return InMemoryDatabase;
}

const PokemonDB = createDatabaseObserver<Pokemon>();

// const ubsubscribe = PokemonDB.instance.onAfterAdd(({ value }) => {
//   console.log(value);
// });

PokemonDB.instance.set({
  id: 'Bulbasaur',
  attack: 10,
  defense: 10,
});

// ubsubscribe(); result -> { id: 'Bulbasaur', attack: 10, defense: 10 }

PokemonDB.instance.set({
  id: 'Spinosaur',
  attack: 20,
  defense: 20,
});

// ubsubscribe();

// result ->
// { id: 'Bulbasaur', attack: 10, defense: 10 }
// { id: 'Spinosaur', attack: 20, defense: 20 }

PokemonDB.instance.onVisit((item) => {
  console.log("visit Ids: ", item.id);
});

// result ->
// visit Ids:  Bulbasaur
// visit Ids:  Spinosaur
