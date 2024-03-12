import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

import express from 'express';
import { prismaClient } from '../client/db';



export async function initServer() {
    const app = express();

    app.use(express.json())

    const server = new ApolloServer({
        typeDefs:`
        type Query{
            sayHello: String
        }`,
        resolvers:{
            Query:{
                sayHello: ()=>"hello"
            },
            
        },
    });
   
    await server.start();
    app.use('/graphql', expressMiddleware(server));
    return app;
}
