// Basic Extends

interface A {
  name: string;
}

interface B extends A {
  age: number;
}

const aB: B = {
  name: 'John',
  age: 20,
}

// Basic Ternary Extends

type C = A extends B ? number : string;

const c: C = 'Hello';

// Generic for extends
// can keep nested extends ~ (Demo only)
type GenericTypeT<T> = T extends string ? string : T extends number ? number : T extends boolean ? boolean : T extends undefined ? undefined : T extends null ? null : T extends object ? object : T;

const testString: GenericTypeT<string> = "true"; // test is typed as true
const testNull: GenericTypeT<null> = null; // test is typed as true
const testUndefined: GenericTypeT<undefined> = undefined; // test is typed as true

// Infer example
type GenericInfer<T> = T extends Array<infer U> ? U : T;

const testArray = ["string", 1, true, undefined, null, { name: "John" }];

const testArrayInfer: GenericInfer<typeof testArray> = 1; // The type for testArrayInfer:  const testArrayInfer: string | number | boolean | {name: string;} | null | undefined


type CustomReturnType<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer R ? R : never;

type CustomFetchType = CustomReturnType<typeof fetch>; // type CustomFetchType = Promise<Response>

// We can extract Response type out now by using Awaited:

// type AwaitedCustomFetchType = Awaited<CustomFetchType>; // type AwaitedCustomFetchType = Response

// Or

type CustomAwaited<T> = T extends Promise<infer U> ? U : T;

type AwaitedCustomFetchType = CustomAwaited<CustomFetchType>; // type AwaitedCustomFetchType = Response


// key value splitter - example of extract type from string
// when data format is key:value
type KeyValueSplitter<T extends string> = T extends `${infer Key}:${infer Value}` ? {key: Key, value: Value } : never;

type exampleOfKeyValueSplitter = KeyValueSplitter<"name:Doe">; // result will be:
// type exampleOfKeyValueSplitter = {
//   key: "name";
//   value: "Doe";
// }

type exampleOfKeyValueSplitterNever = KeyValueSplitter<"name Doe">; // result will be:
// type exampleOfKeyValueSplitterNever = never


// Define type for function
type ObjectTypeDemo = {
  name: string;
  age: number;
}

type NewObjectType<O> = {
  [K in keyof O]: O[K];
}

const ObjectTypeDemoExample: NewObjectType<ObjectTypeDemo> = {
  name: "John",
  age: 20,
}

// Add or remove readonly or optional

// Add readonly example
type NewObjectTypeReadOnlyAdd<O> = {
  readonly [K in keyof O]: O[K];
}

const ObjectTypeDemoExample2: NewObjectTypeReadOnlyAdd<ObjectTypeDemo> = {
  name: "John",
  age: 20,
}

// ObjectTypeDemoExample2.name = "Doe"; // ❌ error because name is readonly
// ObjectTypeDemoExample2.age = 32; // ❌ error because age is readonly

// Remove readonly example
type NewObjectTypeReadOnlyRemove<O> = {
  -readonly [K in keyof O]: O[K];
};

const ObjectTypeDemoExample3: NewObjectTypeReadOnlyRemove<ObjectTypeDemo> = {
  name: "John",
  age: 20,
}

ObjectTypeDemoExample3.name = "Doe"; // no error because name is not readonly
ObjectTypeDemoExample3.age = 32; // no error because age is not readonly


// Optional readonly example
type NewObjectTypeOptional<O> = {
  [K in keyof O]?: O[K];
};

const ObjectTypeDemoExample4: NewObjectTypeOptional<ObjectTypeDemo> = {
  name: undefined,
  age: undefined,
}

// Remove optional example
type NewObjectTypeOptionalRemove<O> = {
  [K in keyof O]-?: O[K];
};

// const ObjectTypeDemoExample5: NewObjectTypeOptionalRemove<ObjectTypeDemo> = {
//   // name: undefined, // ❌ error because name is not optional
//   age: 20,
// }
