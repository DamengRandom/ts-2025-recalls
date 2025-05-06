// Typescript Generics Recall

// Basic Usage Example:

function getFirstElement<ElementType>(array: ElementType[]): ElementType {
  return array[0];
}

const numbers = [1, 2, 3];
const firstNumber = getFirstElement<number>(numbers);
console.log(firstNumber);

const strings = ['words', 'for', 'typescript', 'generics'];
const firstString = getFirstElement<string>(strings);
console.log(firstString);


// DOM element selector example:
const inputElement = document.querySelector<HTMLInputElement>('.input-class'); // Add HTMLInputElement as specific trpe for avoid type erorr of `Property 'value' does not exist on type 'Element'.`
const inputElementValue = inputElement?.value; // ?.value will return a type warning as `Property 'value' does not exist on type 'Element'.` if we don't add the specific type: HTMLInputElement.


// Generic Map Example:
const genericMapExample = new Map<string, number>();
genericMapExample.set('key', 1);


// API Response Example: (Most common usage, like when we need to represent for specific data shape)
type APIResponse<Data extends object> = {
  data: Data;
  status: number;
}
// extends objects means that the Data type must be an object !!!

// Assuming if we defined like this: will give type error, eg:

// const mockUserData: APIResponse<string> = {
//   data: 'string',
//   status: 'NotReady',
// }

type UserData = {
  name: string;
  age: number;
  isActive: boolean;
};

type UserResponse = APIResponse<UserData>;
// Example of how to use the APIResponse type:
const userResponse: Promise<UserResponse[]> = fetch('https://api.example.com/users').then(response => response.json());


// Final practical example:
