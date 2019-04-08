import { buildSchema } from 'graphql';

export const schema = buildSchema(`
    type Query {
      quoteOfTheDay: String
      random: Float!
      rollThreeDice: [Int]
      rollDice(numDice: Int!, numSides: Int): [Int]
      me(name: String!, age: Int): Person
      user: Person
    }
    
    type Mutation {
      setUserAge(age: Int!): Person
    }
  
    
    type Person {
      name: String
      age: Int
      children: Children
    }
    
    type Children {
      name: String
      age: Int
      parent: Person
    }
  `);

// The root provides a resolver function for each API endpoint
export const root = {
    quoteOfTheDay: () => {
        return Math.random() < 0.5 ? 'Take it easy' : 'Salvation lies within';
    },
    random: () => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(Math.random());
            }, 5000);
        })
    },
    rollThreeDice: () => {
        return [1, 2, 3].map(_ => 1 + Math.floor(Math.random() * 6));
    },
    rollDice: function ({numDice, numSides = 6}) {
        var output = [];
        for (var i = 0; i < numDice; i++) {
            output.push(1 + Math.floor(Math.random() * (numSides)));
        }
        return output;
    },
    user: () => {
        return user || new Person('Guest')
    },
    setUserAge: function ({age}) {
        if (user) {
            user.age = age;
            return user;
        }
        else {
            return new Person('Guest', age);
        }
    }
};
