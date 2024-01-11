import { NestjsQueryGraphQLModule, PagingStrategies } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { CarColorEntity } from '@ridy/database/car-color.entity';
import { CarModelEntity } from '@ridy/database/car-model.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { CarColorDTO } from './dto/car-color.dto';
import { CarModelDTO } from './dto/car-model.dto';

@Module({
    imports: [
        // Import NestjsQueryGraphQLModule for feature with TypeORM support
        NestjsQueryGraphQLModule.forFeature({
            // Import NestjsQueryTypeOrmModule for feature with entities (CarColorEntity, CarModelEntity)
            imports: [NestjsQueryTypeOrmModule.forFeature([CarColorEntity, CarModelEntity])],
            resolvers: [
                {
                    // Configure resolver for CarModelEntity
                    EntityClass: CarModelEntity,
                    DTOClass: CarModelDTO,
                    create: { many: { disabled: true }}, // Disable creating multiple entities
                    update: { many: { disabled: true }}, // Disable updating multiple entities
                    delete: { many: { disabled: true }}, // Disable deleting multiple entities
                    pagingStrategy: PagingStrategies.OFFSET, // Use OFFSET paging strategy
                    enableTotalCount: true, // Enable total count in response
                    guards: [JwtAuthGuard] // Use JwtAuthGuard for authorization
                },
                {
                    // Configure resolver for CarColorEntity
                    EntityClass: CarColorEntity,
                    DTOClass: CarColorDTO,
                    create: { many: { disabled: true }}, // Disable creating multiple entities
                    update: { many: { disabled: true }}, // Disable updating multiple entities
                    delete: { many: { disabled: true }}, // Disable deleting multiple entities
                    pagingStrategy: PagingStrategies.NONE, // Use NONE paging strategy
                    enableTotalCount: true, // Enable total count in response
                    guards: [JwtAuthGuard] // Use JwtAuthGuard for authorization
                }
            ]
        })
    ]
})
export class CarModule {}
