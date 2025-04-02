type Diesel = {
  type: 'petroleum' | 'bio' | 'synthetic';
}

type Gasoline = {
  type: 'hybird' | 'conventional';
}

type Bus = {
  engine: Diesel
}

type Car = {
  engine: Gasoline
}

type Engine<T> = T extends { engine: unknown } ? T['engine'] : never;

type BusEngine = Engine<Bus>;
type CarEngine = Engine<Car>;


const busEngine: BusEngine = {
  type: 'petroleum'
}

const carEngine: CarEngine = {
  type: 'hybird'
}

// const invalid: Engine<Car> = {
//   type: 'bio' // Error: 'bio' is not assignable to type 'Gasoline'.
// }; // correct type value should be 'hybird' or 'conventional'



// ############################# Another example ################################

const Priority = {
  High: 'High',
  Medium: 'Medium',
  Low: 'Low'
} as const;



const backlog = {
  releases: [
    {
      name: "Sprint 1",
      epics: [
        {
          name: "Account Management",
          tasks: [
            { "name": "Single Sign On", priority: Priority.High },
            { "name": "Email Notifications", priority: Priority.Medium },
            { "name": "Refresh Token Development", priority: Priority.Low },
          ]
        }
      ]
    }
  ]
}

type UnArray<T> = T extends Array<infer U> ? U : T;
type Release = UnArray<typeof backlog['releases']>;

type Epic = UnArray<Release['epics']>;
type Task = UnArray<Epic['tasks']>;

// we could potentially try to define some constants/variables based on the type we have defined
let release: typeof backlog['releases'] = []; // this is valid type definitions

// now, lets do something crazy:
const newReleases: Release = {
  name: 'Sprint 2',
  epics: [
    {
      name: 'Account Management',
      tasks: [
        {
          name: 'UI Development',
          priority: Priority.High
        }
      ]
    }
  ]
}

const newEpic: Epic = {
  name: 'Account Management',
  tasks: [
    {
      name: 'SNS Service Development',
      priority: Priority.Medium
    }
  ]
}

const newTask: Task = {
  name: 'Unknown Task For Development',
  priority: Priority.Low
}