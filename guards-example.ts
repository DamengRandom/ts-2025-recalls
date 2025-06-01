interface DeliminatedDocument {
  delimiter: string;
  text: string;
}

interface PlainTextDocument {
  text: string;
}

const printDeliminated = (doc: DeliminatedDocument) => {};

const printPlainText = (doc: PlainTextDocument) => {};

// Bad

// const printDocument = (doc: DeliminatedDocument | PlainTextDocument) => {
//   printDeliminated(doc); // ❌
// }

// Good

// Example of how to use the guard by using 'in' operator !!!!!!!!!
const printDocument = (doc: DeliminatedDocument | PlainTextDocument) => {
  if ("delimiter" in doc) { // This is a guard  by using 'in' operator !!!!!!!!!
    printDeliminated(doc); // ✅
  } else {
    printPlainText(doc); // ✅
  }
};
