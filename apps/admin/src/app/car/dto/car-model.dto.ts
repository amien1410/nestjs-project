import { Authorize, IDField } from "@nestjs-query/query-graphql";
import { ID, ObjectType } from "@nestjs/graphql";
import { CarAuthorizer } from "./car.authorizer";

@ObjectType('CarModel')
// Authorize CarModel operations using the CarAuthorizer
@Authorize(CarAuthorizer)
export class CarModelDTO {
    // ID field for CarModel
    @IDField(() => ID)
    id: number;

    // Name of the car model
    name: string;
}
