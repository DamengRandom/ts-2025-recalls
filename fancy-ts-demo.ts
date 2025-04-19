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


// 5). Extract Type (again 😂)

type JobProps =
  | {
    type: 'developer';
    skills: string[];
  }
  | {
    type: 'designer';
    tools: string[];
  };

type ExtractTypeForDeveloper = Extract<JobProps, { type: 'developer' }>;

const extractTypeForDeveloper: ExtractTypeForDeveloper = {
  type: 'developer',
  skills: ['React', 'TypeScript', 'JavaScript'],
}


// 6). Generics with conditional typesTry

type MockAPIResponse<T> = 
  | {
    data: T;
    status: number;
  }
  | {
    error: string;
    status: number;
  }

let responseMockOne: MockAPIResponse<{ name: string }> = {
  data: { name: 'John' },
  status: 200,
};

let responseMockTwo: MockAPIResponse<undefined> = { // pass undefined to the generic type also works if no generic type defined ~
  error: 'Not found',
  status: 404,
}


// 7). TBD ..
