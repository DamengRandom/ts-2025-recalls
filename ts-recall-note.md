# Typescript is a superset of JavaScript, which means that all JavaScript code is valid TypeScript code.

## Q & As

### Why Typescript?

Becasue type safe, and avoid JavaScript runtime error when the javascript code is running.

So the mindset so far  is to use typescript to write javascript code with some type definitions, and then compile it to javascript.

Eventaully run the javascript code in the browser or node.js. (Thats why we need to compile it to javascript because the browser or node.js only understand javascript !)

Also hard to debug since Javascript is a very dynamic language, during code run time, we can't know the type of the variable.


### Does typescript improve our code if we just change the file extension from .js to .ts?

Yes, it does, because we can start to get the hint of type errors during the time we write code to that ts file !

Eg; if we write a code in .ts and .js file,

console.log(value.toUpperCase().toNumber()); // .ts file will throw an error, but .js file will not.


### How to define a type in typescript?

export type AType = string | number | boolean | null | undefined | object | symbol | bigint | function | array | tuple | enum | interface | class | type;

Basic types: 

- string
- number
- boolean
- null
- undefined
- object
- symbol
- bigint
- function

Custom types:

- enum
- interface
- class
- type

Examples:

const stringValue: string = "Hello, world!";
const numberValue: number = 42;
const booleanValue: boolean = true;
const nullValue: null = null;
const undefinedValue: undefined = undefined;
const objectValue: object = { name: "John", age: 30 };
const symbolValue: symbol = Symbol("unique");
const bigintValue: bigint = BigInt(9007199254740991);
const functionValue: () => void = () => {
    console.log("Hello, world!");
};

const arrayValue: string[] = ["Hello", "world"];
const tupleValue: [string, number] = ["Hello", 42];
const enumValue: Color = Color.Red;
const interfaceValue: Person = { name: "John", age: 30 };
const classValue: MyClass = new MyClass();
const typeValue: MyType = "Hello";


### What is the difference between implicit and explicit typing?

Implicit typing:

- The type is inferred from the value assigned to the variable.
- The type is not explicitly defined.

Explicit typing:

- The type is explicitly defined.
- recomanded to use explicit typing because it can avoid some potential type errors !

Examples:

const stringValue = "Hello, world!"; // Implicit typing
const numberValue: number = 42; // Explicit typing


### is that better to define a function with type? Yes, please do it !!!!!!!! - more type safety and clear statement of the function's input and output.

function getFullName(firstName: string, lastName: string): string {
    return `${firstName} ${lastName}`;
}

const fullName = getFullName("John", "Doe");

console.log(fullName);


### What is interface in typescript?

Interface is a way to define a type in typescript.

interface IUserProps {
  name: string;
  age: number;
}

function getUserInfo(user: IIUserProps): string {
  return `Name: ${user.name}, Age: ${user.age}`;
}

const user: IUserProps = { name: "John", age: 30 };

console.log(getUserInfo(user)); // more type safety and clear statement of the function's input and output.


### What is type in typescript?

Type is a way to define a type in typescript.

Type is more flexible than interface.

Type can be used to define a type for a variable, a function, a class, an interface, etc.

Make code also a bit more reeadable ~

export type StringType = string;
export type UnionValueType = string | number;


### Type vs Interface vs Class

Type is more flexible than interface.

Type can be used to define a type for a variable, a function, a class, an interface, etc.

Interface can be extended by another interface.

export interface ITraderProps extends IUserProps {
  id: string;
}

const trader: ITraderProps = {
  name: "John",
  age: 30,
  id: "123",
}

type way of extending another type.

type ITraderProps = IUserProps & {
  id: string;
}

Class can be implemented and extended by another class.

interface IDealTraderProps extends ITraderProps {
  dealThing(): string; // this is how to define a method with type in a class !!
}

export class DealTrader implements IDealTraderProps {
  id: string;
  name: string;
  age: number;

  constructor(id: string, name: string, age: number) {
    this.id = id;
    this.name = name;
    this.age = age;
  }

  dealThing(): string { // must be implemented in the class since IDealTraderProps extends ITraderProps which has dealThing() method !!
    return "Deal thing";
  }
} 

const dealTrader = new DealTrader("123", "John", 30);

console.log(dealTrader);


### What is type narrowing?

Type narrowing is a way to narrow down the type of a variable.

const foo = (val: string | number) => {
  if (typeof val === "string") {
    return val.toUpperCase(); // val is string here
  } 

  return val.toFixed(2); // val is number here - see narrow down the type of val !!!!!
}

Another example:

type LoadingState = {
  state: "loading";
}

type FailedState = {
  state: "failed";
  error: string;
}

type SuccessState = {
  state: "success";
  data: any;
}

type State = LoadingState | FailedState | SuccessState; // union type way

// type narrowing way

const handleState = (state: State) => {
  if (state.state === "loading") {
    return state.state;
  }

  if (state.state === "failed") {
    return state.error;
  }

  return state.data;
}


### What is type assertion?

Type assertion is a way to tell the compiler to treat a variable as a specific type.

const foo = (val: string | number) => {
  return val as string; // tell the compiler to treat val as a string
}


### What is type inference?

Type inference is a way to let the compiler infer the type of a variable.

const foo = (val: string | number) => {
  return val; // the compiler will infer the type of val
}

const bar = foo("hello"); // bar is string here

const baz = foo(123); // baz is number here


### Union type and intersection type

Union type is a type that can be one of several types.

Intersection type is a type that can be one of several types.

const type NameProps = { firstName: string; lastName: string };
const type AgeProps = { age: number };

type PersonAllProps = NameProps & AgeProps; // intersection type

type PersonPartialProps = NameProps | AgeProps; // union type

const person: PersonProps = { firstName: "John", lastName: "Doe", age: 30 };

const personFirstName: PersonPartialProps = { firstName: "John" };


### Enum

Enum is a way to define a type in typescript.

Enum can be used to define a type for a variable, a function, a class, an interface, etc.

first way define as enum

enum Color {
  app = 1,
  email = 0,
  social = 2,
}

console.log(Color.app); // 1
console.log(Color[0]); // email

Above way is normal, but TypeScript do support a better way which is directly define a type as const (2nd way which is better)

const ColorConst = {
  app: "app",
  email: "email",
  social: "social",
} as const;

export type ColorProps = keyof typeof ColorConst;

Or directly define a literal string type (3rd way)

type Color = "app" | "email" | "social";

const color: Color = "app";

console.log(color); // app


### Literal Type

Literal type is a type that can be one of several values.

const color: "app" | "email" | "social" = "app";

Or second example:

type Size = "small" | "medium" | "large";

type ColorStyle = "primary" | "secondary";

type ColorSizeProps = `${Size}-${ColorStyle}`;


### TypeScript mapped types

Mapped types are a way to create a new type by mapping over an existing type.

type MappedType = {
  [Key in Keyof Type]: Type[Key];
}

Another example:

export type Setters<State> = {
  [K in keyof State & string as `set${Capitalize<K>}`]: (value: State[K]) => void;
}

export type Getters<State> = {
  [K in keyof State & string as `get${Capitalize<K>}`]: () => State[K];
}

export type Store<State> = Setters<State> & Getters<State>;

type PersonState = {
  name: string;
  age: number;
}

type PersonStore = Store<PersonState>;

declare const personStore: PersonStore;

personStore.setName("John");
personStore.setAge(30);

const name: string = personStore.getName();
const age: number = personStore.getAge();

console.log(name, age);


### TypeScript `satisfies` Operator

The satisfies operator is a way to check if a type satisfies a condition.

type Color = ColorString | ColorRGB;
type ColorString = "red" | "green" | "blue" | "yellow" | "purple";
type ColorRGB = [red: number; green: number; blue: number ];

type Theme = Record<string, Color>;

const theme = {
  primary: "redd", // will show TS error since no red color in ColorString type and which is not satisfies the Color type !!!
  secondary: [255, 0, 0],
} satisfies Theme;


### TypeScript `Awaited` operator

The `Awaited` operator is a way to get the value of a promise.

type Awaited<T> = T extends Promise<infer U> ? U : T;

Another example:

async function fetchUser<T>() {
  const response = await fetch("https://api.example.com/user");
  const data: Awaited<T> = await response.json();
  return data;
}

const user = await fetchUser<{ name: string; age: number }>();


### TypeScript Lookup Types

Lookup types are a way to get the type of a property of an object.

// Assuming backend defined the interface Person in a complex way:

interface Person {
  name: {
    first: string;
    middle?: string;
    last: string;
  };
  age: number;
  address: {
    note: {
      optional: string;
      required: string;
    }[];
    street: string;
    city: string;
    state: string;
    zip: string;
  }
  phone: string;
  hobby: string[];
  isActive: boolean;
}

// Now we can use lookup types to get the type of a property of the Person interface:

type PersonName = Person["name"];

type PersonAddressWithNote = Person["address"]["note"]; // can look up for the nested property of the object

type PersonHobby = Person["hobby"]; // just pick up one of props from complex type definitions (narrow it ~)

type PersonNameWithHobby = PersonName & PersonHobby; // intersection type


### TypeScript never

you can only assign never to never, you can assign never to any other type, but you cannot assign any other type to never.

Use cases: Throw error

function fail(message: string): never {
  throw new Error(message);
}

function exhaustiveCheck(x: never) {
  // Will error if called with any real type
}

const errorMessage: never = error("This is an error message"); // ✅

const errorMessage2: never = "This is an error message"; // ❌ since type is string already, cannot assign never to it !!!

const errorMessage3: string = error("This is an error message"); // ✅ since type is string, to represent for never typed value (which is error("This is an error message")) !!!

Another example:

type NoEmpty<T> = T extends null | undefined ? never : T; // exclude null and undefined from NoEmpty type



### TypeScript unknown

unknown is a type that can be any type.

const unknownValue: unknown = "This is an unknown value"; // ✅

const unknownValue2: unknown = 123; // ✅


### keyof operator in TS (MUST REMEMBER THIS !!!!)

type TPerson = {
  name: string;
  age: number;
}

function logAccess<T, K extends keyof T>(obj: T, key: K) {
  console.log(obj[key]);
}

logAccess({ name: "John", age: 30 }, "name"); // ✅


### Another good tips for type definition

Always check the original provided API documentation to understand the type definitions before starting to define your own type definitions. Please READ the doc carefully. 


Any && Unknown && Never

- Any is unsafe, unknown is safe, and never is strictest
- Cannot assign unknown to anything
- Cannot assign anything to never


### Type vs Interface

Feature	interface	type
Extending	                    ✅ Yes (extends)	              ✅ Yes (via unions & intersections &)
Merging (declaration merging)	✅ Yes (interfaces auto-merge)	❌ No (types can't merge)
Unions / Primitives	          ❌ No	                        ✅ Yes (string | number)
Recommended for	              Objects & classes	             Anything (primitives, unions, objects)

Example:

```ts
interface User {
  id: number;
}

interface User {
  name: string;
}

// Merged result:
const user: User = { id: 1, name: "Alice" };
// See, auto merged ~
```

### To be continued ...
