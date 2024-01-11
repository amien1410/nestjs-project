import { GqlExecutionContext, ObjectType } from "@nestjs/graphql";

// GraphQL object type representing an authenticated operator.
@ObjectType('AuthenticatedOperator')
export class AuthenticatedOperatorDTO {
    id: number;
}

// Type definition for the user context in the GraphQL execution context.
export type UserContext = GqlExecutionContext & { req: { user: AuthenticatedOperatorDTO } };
