type Route = {
  origin: {
    city: string;
    state: string;
    departureTime: Date;
    departureTerminal: string;
    departureFee: number;
  }
  destination: {
    city: string;
    state: string;
    arrivalTime: Date;
    arrivalTerminal: string;
  }
}

type Origin = Route['origin']; // this is a lookup[type]
type Destination = Route['destination']; // this is a lookup[type]

const tripOrigin: Origin = {
  city: 'New York',
  state: 'NY',
  departureTime: new Date(),
  departureTerminal: 'JFK',
  departureFee: 100,
}

const tripDestination: Destination = {
  city: 'Los Angeles',
  state: 'CA',
  arrivalTime: new Date(),
  arrivalTerminal: 'LAX',
}

