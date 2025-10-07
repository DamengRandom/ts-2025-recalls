# Mapped Types and transform exsiting types

## Example 1:

```ts
type Optional<T> = {
  [P in keyof T]?: T[P];
};

type PersonType = {
  name: string;
  age: number;
  email: string;
}

type OptionalPersonType = Optional<PersonType>;

// OptionalPersonType will be:
{
  name?: string;
  age?: number;
  email?: string;
}
```

## Example 2:

```ts
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type PersonType = {
  name: string;
}

type ReadonlyPersonType = Readonly<PersonType>;
```

## Example 3:

```ts
type Required<T> = {
  [P in keyof T]-?: T[P];
};

type PersonType = {
  name: string;
  age?: number;
}

type RequiredPersonType = Required<PersonType>;
```

Example 4:

```ts
type Partial<T> = {
  [P in keyof T]?: T[P];
};

type PersonType = {
  name: string;
  age: number;
  email: string;
}

type PartialPersonType = Partial<PersonType>;
```

Example 5:

```ts
type Nullable<T>= {
  [P in keyof T]: T[P] | null;
};

type PersonType = {
  name: string;
  age: number;
  email: string;
}

type NullablePersonType = Nullable<PersonType>;
```
