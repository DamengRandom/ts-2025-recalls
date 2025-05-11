// Type guard is a way to check the type of a variable.

// A type guard is a runtime check that tells TypeScript “hey, inside this block, the type is more specific”.

function printLength(strOrNum: string | number) {
  if (typeof strOrNum === "string") {
    // 🔥 TypeScript now knows: strOrNum is string here
    console.log(strOrNum.length);
  } else {
    // 🔥 Here, TypeScript knows: strOrNum is number
    console.log(strOrNum.toFixed(2));
  }
}

printLength("hello");
printLength(123);
