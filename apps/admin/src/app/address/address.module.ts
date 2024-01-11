import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { RiderAddressEntity } from '@ridy/database/rider-address.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AddressDTO } from './dto/address.dto';

@Module({
    imports: [
        // Use NestjsQueryGraphQLModule to simplify GraphQL CRUD operations
        NestjsQueryGraphQLModule.forFeature({
            imports: [NestjsQueryTypeOrmModule.forFeature([RiderAddressEntity])],
            resolvers: [
                {
                    // Specify the EntityClass and DTOClass for RiderAddressEntity
                    EntityClass: RiderAddressEntity,
                    DTOClass: AddressDTO,
                    
                    // Configure CRUD operations (create, update, delete)
                    create: { disabled: true },
                    update: { disabled: true },
                    delete: { disabled: true },

                    // Add JwtAuthGuard as a guard for all operations
                    guards: [JwtAuthGuard]
                }
            ]
        }),
    ]
})
export class AddressModule {}
