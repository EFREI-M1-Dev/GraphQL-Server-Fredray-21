import {ApolloServer} from "@apollo/server";
import {startStandaloneServer} from '@apollo/server/standalone';

const doctorsData = [
    {
        id: "1",
        name: 'Samia Mekame',
        speciality: 'OPHTALMOLOGIST',
    },
    {
        id: "2",
        name: 'Catherine Bedoy',
        speciality: 'PSYCHOLOGIST',
    },
];

const typeDefs = `#graphql
type Doctor {
  id: String
  name: String
  speciality: SPECIALITY
  addresses: Address
}

type Address {
  streetName: String
}

enum SPECIALITY {
  PSYCHOLOGIST
  OPHTALMOLOGIST
}

type Query {
  doctors(specialities: [SPECIALITY!]): [Doctor]
  doctor(id: ID!): Doctor
  add(number1: Float!, number2: Float!): Float!
  subtract(number1: Float!, number2: Float!): Float!
  multiply(number1: Float!, number2: Float!): Float!
  divide(number1: Float!, number2: Float!): Float!
  closestColor(hex: String!): String
}
`

const calculate = (number1: number, number2: number, operation: string) => {
    switch (operation) {
        case 'add':
            return number1 + number2
        case 'subtract':
            return number1 - number2
        case 'multiply':
            return number1 * number2
        case 'divide':
            return number1 / number2
        default:
            throw new Error('Operation not supported')
    }
}

const colors = ["#FF5733", "#33FF57", "#3357FF"];

const hexToRgb = (hex:string) => {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b];
}

const rgbDistance = (rgb1:number[], rgb2:number[]) => {
    const rDiff = rgb1[0] - rgb2[0];
    const gDiff = rgb1[1] - rgb2[1];
    const bDiff = rgb1[2] - rgb2[2];
    return Math.sqrt(rDiff * rDiff + gDiff * gDiff + bDiff * bDiff);
}

const findClosestColor = (hex:string, colorArray:string[]) => {
    const targetRgb = hexToRgb(hex);
    let minDistance = Infinity;
    let closestIndex = -1;
    for (let i = 0; i < colorArray.length; i++) {
        const colorRgb = hexToRgb(colorArray[i]);
        const distance = rgbDistance(targetRgb, colorRgb);
        if (distance < minDistance) {
            minDistance = distance;
            closestIndex = i;
        }
    }
    return closestIndex;
}

const resolvers = {
    Query: {
        doctors: (parent, args, context, info) => {
            const {specialities} = args
            console.log('Running doctors query with specialities:', specialities);
            return doctorsData.filter(d => specialities.includes(d.speciality))
        },
        doctor: (parent, args, context, info) => {
            const {id} = args
            console.log('Running doctor query with id:', id);
            return doctorsData.find(d => d.id === id)
        },
        add: (parent, args, context, info) => {
            const {number1, number2} = args
            console.log('Running add query with number1:', number1, 'number2:', number2);
            return calculate(number1, number2, 'add')
        },
        subtract: (parent, args, context, info) => {
            const {number1, number2} = args
            console.log('Running subtract query with number1:', number1, 'number2:', number2);
            return calculate(number1, number2, 'subtract')
        },
        multiply: (parent, args, context, info) => {
            const {number1, number2} = args
            console.log('Running multiply query with number1:', number1, 'number2:', number2);
            return calculate(number1, number2, 'multiply')
        },
        divide: (parent, args, context, info) => {
            const {number1, number2} = args
            console.log('Running divide query with number1:', number1, 'number2:', number2);
            return calculate(number1, number2, 'divide')
        },
        closestColor: (parent, args, context, info) => {
            const {hex} = args
            console.log('Running closestColor query with hex:', hex);
            return colors[findClosestColor(hex, colors)]

        }
    },
    Doctor: {
        addresses: (parent, args, context, info) => {
            console.log(parent)
            return {streetName: `${parent.id} street`}
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

const {url} = await startStandaloneServer(server, {
    listen: {port: 4000}
})

console.log(`🚀  Server ready at: ${url}`)