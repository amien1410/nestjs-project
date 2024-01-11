import { Authorize, IDField } from "@nestjs-query/query-graphql";
import { ID, ObjectType } from "@nestjs/graphql";
import { CarAuthorizer } from "./car.authorizer";

@ObjectType('CarColor')
@Authorize(CarAuthorizer) // Apply authorization using CarAuthorizer
export class CarColorDTO {
    @IDField(() => ID) // Define ID field of type ID
    id: number;

    name: string; // Define name field of type string
}
