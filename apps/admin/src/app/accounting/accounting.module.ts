import { NestjsQueryGraphQLModule, PagingStrategies } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestEntity } from '@ridy/database/request.entity';
import { ProviderTransactionEntity } from '@ridy/database/provider-transaction.entity';
import { ProviderWalletEntity } from '@ridy/database/provider-wallet.entity';

import { AccountingResolver } from './accounting.resolver';
import { AccountingService } from './accounting.service';
import { ProviderTransactionDTO } from './dto/provider-transaction.dto';
import { ProviderWalletDTO } from './dto/provider-wallet.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Module({
  imports: [
    // Importing TypeORM modules for specific entities
    TypeOrmModule.forFeature([ProviderTransactionEntity, RequestEntity]),

    // NestJS Query TypeORM Module for GraphQL integration
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        // Importing entities for NestJS Query GraphQL
        NestjsQueryTypeOrmModule.forFeature([ProviderTransactionEntity, ProviderWalletEntity]),
      ],
      resolvers: [
        // Resolver configuration for ProviderTransactionEntity
        {
          EntityClass: ProviderTransactionEntity, // Entity to be resolved
          DTOClass: ProviderTransactionDTO, // DTO used to shape the data
          create: { many: { disabled: true }}, // Disable creating multiple transactions
          update: { disabled: true }, // Disable updating transactions
          delete: { disabled: true }, // Disable deleting transactions
          pagingStrategy: PagingStrategies.OFFSET, // Paging strategy for transactions
          enableTotalCount: true, // Enable total count for pagination
          guards: [JwtAuthGuard], // Authorization guard for resolver actions
        },
        // Resolver configuration for ProviderWalletEntity
        {
          EntityClass: ProviderWalletEntity, // Entity to be resolved
          DTOClass: ProviderWalletDTO, // DTO used to shape the data
          create: { disabled: true }, // Disable creating wallets
          update: { disabled: true }, // Disable updating wallets
          delete: { disabled: true }, // Disable deleting wallets
          pagingStrategy: PagingStrategies.NONE, // Disable paging for wallets
          guards: [JwtAuthGuard], // Authorization guard for resolver actions
        },
      ],
    }),
  ],
  providers: [
    // Provide services and resolvers for accounting
    AccountingService,
    AccountingResolver,
  ],
})
export class AccountingModule {}
