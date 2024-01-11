import { ObjectType } from "@nestjs/graphql";

// Represents an item in the income result with specific properties
@ObjectType()
export class IncomeResultItem {
    time: string; // Represents time
    sum: number; // Represents sum or amount
    currency: string; // Represents currency
}

// Represents the overall income results containing an array of IncomeResultItem objects
@ObjectType()
export class IncomeResults {
    items: IncomeResultItem[]; // Contains an array of IncomeResultItem objects
}
