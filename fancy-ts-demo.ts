// 1). keyof typeof ObjectXXX

const objOne = {
  name: 'John',
  age: 30,
  city: 'New York',
}

type ObjKeyTypes = keyof typeof objOne;

const objTwo: Record<ObjKeyTypes, string> = {
  name: 'John',
  age: '30',
  city: 'New York',
}


// 2). ReturnType

const funcOne = () => {
  const text = 'Hello';

  return text;
}

type FuncOneReturnType = ReturnType<typeof funcOne>;

// if the function is asynchronous, we can use Awaited<ReturnType<typeof funcOne>>

const funcTwo = async () => {
  const text = 'World';

  return text;
}

type FuncTwoReturnType = Awaited<ReturnType<typeof funcTwo>>;

// 3). Prettify

interface MainTypeProps {
  name: string;
  age: number;
  gender: string;
}

type NestedTypeProps = MainTypeProps & {
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  }
}

type PrettifyGenericType<T> = {
  [K in keyof T]: T[K];
} & {};

type CombinedMainTypeProps = PrettifyGenericType<NestedTypeProps>;

const combinedMainTypeProps: CombinedMainTypeProps = {
  name: 'John',
  age: 30,
  gender: 'Male',
  address: {
    street: '123 Main St',
    city: 'New York',
    state: 'NY',
    zip: '10001',
  },
}


// 4). Exclude Type

type ShapesProps =
  | {
    type: 'circle';
    radius: number;
  }
  | {
    type: 'square';
    side: number;
  };

type ExcludeTypeForSquare = Exclude<ShapesProps, { type: 'circle' }>;

const excludeTypeForSquare: ExcludeTypeForSquare = {
  type: 'square',
  side: 10,
}
