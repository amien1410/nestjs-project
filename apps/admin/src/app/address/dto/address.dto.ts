import { IDField } from "@nestjs-query/query-graphql";
import { ID, ObjectType } from "@nestjs/graphql";
import { Point } from "libs/database/src/lib/interfaces/point";

@ObjectType('Address')
export class AddressDTO {
    // Decorate the id field with the IDField decorator and specify the type
    @IDField(() => ID)
    id!: number;

    // Specify that the title field is required
    title!: string;

    // Allow the details field to be optional
    details?: string;

    // Use the Point type from "libs/database/src/lib/interfaces/point"
    // This assumes Point is a custom GraphQL scalar or type
    location!: Point;
}
