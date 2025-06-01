type Trip = 
  | {
      origin: {
        uuid: string;
        city: string;
        state: string;
        departureTime: Date;
        departureTerminal: string;
        departureFee: number;
      }
    }
  | {
      originUuid: string;
    }

type TripWithOriginRef = Extract<Trip, { originUuid: string }>;
type TripWithOriginWhole = Extract<Trip, { origin: { uuid: string }}>;

// Some data examples after extracting (Practical usage ~)
const tripWithOriginRefExample: TripWithOriginRef = {
  originUuid: '123',
}

const tripWithOriginWholeExample: TripWithOriginWhole = {
  origin: {
    uuid: '123',
    city: 'New York',
    state: 'NY',
    departureTime: new Date(),
    departureTerminal: 'JFK',
    departureFee: 100,
  }
}

// Also we can do the if check for the extracted type

const hasOriginRef = (trip: Trip): trip is TripWithOriginRef => {
  return 'originUuid' in trip;
}

const hasOriginWhole = (trip: Trip): trip is TripWithOriginWhole => {
  return 'origin' in trip;
}

// then we can select the data based on the type

const finalResult = [tripWithOriginRefExample, tripWithOriginWholeExample].filter(hasOriginRef);

console.log('Only returen the data which has origin ref:', finalResult);
