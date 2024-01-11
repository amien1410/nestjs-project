import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthenticationError } from 'apollo-server-fastify';
import { AuthGuard } from '@nestjs/passport';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

  // Overrides the canActivate method to adapt it for GraphQL context.
  canActivate(context: ExecutionContext) {
    // Create a GraphQL execution context from the original context.
    const ctx = GqlExecutionContext.create(context);
    // Extract the request from the GraphQL context.
    const { req } = ctx.getContext();

    // Call the super class's canActivate method with the adapted ExecutionContextHost.
    return super.canActivate(
      new ExecutionContextHost([req]),
    );
  }

  // Overrides the handleRequest method to handle errors and user validation.
  handleRequest(err: any, user: any) {
    // If there is an error or no user is found, throw an AuthenticationError.
    if (err || !user) {
      throw err || new AuthenticationError('GqlAuthGuard');
    }

    // Return the user if everything is successful.
    return user;
  }
}
