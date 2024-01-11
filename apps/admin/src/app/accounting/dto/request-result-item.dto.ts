import { ObjectType } from "@nestjs/graphql";
import { OrderStatus } from "@ridy/database/enums/order-status.enum";

// Represents an item in the requests result with specific properties
@ObjectType()
export class RequestResultItem {
    time: string;    // Represents time
    count: number;   // Represents count
    status: OrderStatus;  // Represents order status from the OrderStatus enum
}

// Represents the overall requests results containing an array of RequestResultItem objects
@ObjectType()
export class RequestsResults {
    items: RequestResultItem[];  // Contains an array of RequestResultItem objects
}
