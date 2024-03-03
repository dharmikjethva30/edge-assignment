const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors');

// Sample data - seats and bookings
// Sample data - seats and bookings
let seats = Array(50)
  .fill()
  .map((_, index) => ({ id: String(index + 1), booked: false }));

let bookings = [];

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    seats: [Seat]
  }

  type Seat {
    id: ID!
    booked: Boolean!
  }

  type Booking {
    id: ID!
    seatId: ID!
    userId: ID!
    createdAt: String!
  }

  type Mutation {
    bookSeat(seatId: ID!): Booking
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
  seats: () => seats,
  bookSeat: ({ seatId }) => {
    const seatIndex = seats.findIndex(seat => seat.id === seatId);
    if (seatIndex === -1 || seats[seatIndex].booked) {
      throw new Error('Seat not available');
    }
    const booking = { id: String(bookings.length + 1), seatId, userId: 'user123', createdAt: new Date().toISOString() };
    seats[seatIndex].booked = true;
    bookings.push(booking);
    return booking;
  },
};

// Create an express server and a GraphQL endpoint
const app = express();
app.use(cors)
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true, // Enable GraphiQL for easy testing
}));

const port = 4000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/graphql`);
});
