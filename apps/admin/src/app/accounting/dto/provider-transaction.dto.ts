import { FilterableField, IDField } from "@nestjs-query/query-graphql";
import { ID, ObjectType } from "@nestjs/graphql";
import { ProviderDeductTransactionType } from "@ridy/database/enums/provider-deduct-transaction-type.enum";
import { ProviderRechargeTransactionType } from "@ridy/database/enums/provider-recharge-transaction-type.enum";
import { TransactionAction } from "@ridy/database/enums/transaction-action.enum";

// Specifies this class as a GraphQL object type with the name 'ProviderTransaction'
@ObjectType('ProviderTransaction')
export class ProviderTransactionDTO {
    // Decorates 'id' property as the primary key field using IDField decorator
    @IDField(() => ID)
    id: number;

    // Represents the creation date of the transaction
    createdAt!: Date;

    // Represents the action of the transaction (from TransactionAction enum)
    action: TransactionAction;

    // Specific transaction types (deductType and rechargeType) from respective enums
    deductType?: ProviderDeductTransactionType;
    rechargeType?: ProviderRechargeTransactionType;

    // Represents the amount and currency of the transaction
    amount: number;
    currency: string;

    // Represents additional transaction reference and description
    refrenceNumber?: string;
    description?: string;

    // Specifies 'operatorId' and 'requestId' as filterable fields with IDs
    @FilterableField(() => ID)
    operatorId?: number;
    @FilterableField(() => ID)
    requestId?: number;
}
