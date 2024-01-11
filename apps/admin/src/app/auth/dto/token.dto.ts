import { ObjectType } from "@nestjs/graphql";

// Define a GraphQL ObjectType for the TokenObject
@ObjectType()
export class TokenObject {
    // Define a field 'token' of type string in the TokenObject
    token: string;
}
