import { registerEnumType } from "@nestjs/graphql";

// Enum representing different chart timeframes
export enum ChartTimeframe {
    Daily = 'Daily',
    Weekly = 'Weekly',
    Monthly = 'Monthly',
    Yearly = 'Yearly'
}

// Registering the ChartTimeframe enum with GraphQL under the name 'ChartTimeframe'
registerEnumType(ChartTimeframe, { name: 'ChartTimeframe'});
