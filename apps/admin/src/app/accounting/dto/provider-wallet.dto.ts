import { FilterableField, IDField } from "@nestjs-query/query-graphql";
import { Float, ID, ObjectType } from "@nestjs/graphql";

// Specifies this class as a GraphQL object type with the name 'ProviderWallet'
@ObjectType('ProviderWallet')
export class ProviderWalletDTO {
    // Decorates 'id' property as the primary key field using IDField decorator
    @IDField(() => ID)
    id: number;

    // Represents the balance of the provider's wallet with a Float type
    @FilterableField(() => Float)
    balance: number;

    // Represents the currency of the provider's wallet with a String type
    @FilterableField(() => String)
    currency: string;

    // Constructor for initializing properties
    constructor(id: number, balance: number, currency: string) {
        this.id = id;
        this.balance = balance;
        this.currency = currency;
    }

    // Method for handling errors in case of invalid data
    private static handleError(message: string): never {
        throw new Error(message);
    }

    // Factory method to create an instance of ProviderWalletDTO with error handling
    static create(id: number, balance: number, currency: string): ProviderWalletDTO {
        if (isNaN(id) || isNaN(balance) || typeof currency !== "string") {
            this.handleError("Invalid data provided for creating ProviderWalletDTO.");
        }
        return new ProviderWalletDTO(id, balance, currency);
    }
}