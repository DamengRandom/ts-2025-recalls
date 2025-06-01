function assertIsNumber(val: any): asserts val is number {
  if (typeof val !== 'number') {
    throw new Error('Value is not a number');
  }
}

function double(input: unknown) {
  assertIsNumber(input); // will throw an error if the input is not a number
  return input * 2;
}

const result = double(2);

console.log(result);

