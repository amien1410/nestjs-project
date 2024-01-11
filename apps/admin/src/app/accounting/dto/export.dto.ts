import { SortDirection } from "@nestjs-query/core";
import { InputType, ObjectType, registerEnumType } from "@nestjs/graphql";

// Output type for export result containing a URL
@ObjectType('ExportResult')
export class ExportResultDTO {
    url: string;
}

// Enum defining exportable tables
enum ExportTable {
    ProviderWallet = 'ProviderWallet',
    DriverWallet = 'DriverWallet',
    RiderWallet = 'RiderWallet',
    FleetWallet = 'FleetWallet'
}
registerEnumType(ExportTable, { name: 'ExportTable' });

// Enum defining export types (e.g., CSV)
enum ExportType {
    CSV = 'csv'
}
registerEnumType(ExportType, { name: 'ExportType' });

// Input type for export arguments
@InputType('ExportArgs')
export class ExportArgsDTO {
    table: ExportTable; // Specifies the table for export
    filters?: ExportFilterArg[]; // Optional filter arguments for export
    sort?: ExportSortArg; // Optional sort argument for export
    relations?: string[]; // Optional relations to include in export
    type: ExportType; // Specifies the export type (e.g., CSV)
}

// Input type for export filter arguments
@InputType('ExportFilterArg')
export class ExportFilterArg {
    field: string; // Field to filter on
    value: string; // Value for filtering
}

// Input type for export sort arguments
@InputType('ExportSortArg')
export class ExportSortArg {
    property: string; // Property to sort by
    direction: SortDirection; // Direction of sorting (e.g., ASC, DESC)
}
